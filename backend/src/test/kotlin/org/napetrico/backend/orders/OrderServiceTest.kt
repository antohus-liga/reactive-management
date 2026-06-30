package org.napetrico.backend.orders

import io.mockk.Awaits
import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.OrderType
import org.napetrico.backend.common.exceptions.NegativeQuantityException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.exceptions.OrderHasNoMovementsException
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.companies.CompanyService
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.movements.MovementService
import org.napetrico.backend.features.orders.Order
import org.napetrico.backend.features.orders.OrderRepository
import org.napetrico.backend.features.orders.OrderService
import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.orders.dto.CreateOrderRequest
import org.napetrico.backend.features.orders.dto.MovementResponse
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import java.math.BigDecimal
import java.util.UUID
import kotlin.collections.mutableSetOf
import kotlin.test.Test

class OrderServiceTest {

    private val orderRepository = mockk<OrderRepository>()
    private val userService = mockk<UserService>()
    private val movementService = mockk<MovementService>()
    private val companyService = mockk<CompanyService>()
    private val productService = mockk<ProductService>()
    private val materialService = mockk<MaterialService>()
    private val orderService = OrderService(
        orderRepository = orderRepository,
        userService = userService,
        movementService = movementService,
        companyService = companyService,
        productService = productService,
        materialService = materialService
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `gets orders`() {
        val order1 = Fixtures.orderFixture()
        val order2 = Fixtures.orderFixture()

        mockCurrentUser()

        every {
            orderRepository.findAllByUser(user)
        } returns listOf(order1, order2)

        val response = orderService.getOrders()

        assertEquals(2, response.size)
    }

    @Test
    fun `creates order`() {
        val company = Fixtures.companyFixture(companyName = "ABC")

        val request = CreateOrderRequest(
            companyPublicId = company.publicId,
            type = OrderType.INBOUND
        )

        mockCurrentUser()

        every {
            companyService.getCompany(company.publicId, user)
        } returns company

        every {
            orderRepository.save(any())
        } answers { firstArg() }

        val response = orderService.createOrder(request)

        assertEquals(company.companyName, response.companyName)
    }

    @Test
    fun `deletes empty order`() {
        val order = Fixtures.orderFixture(
            movements = mutableSetOf()
        )

        mockCurrentUserAndOrder(order)

        every {
            orderRepository.delete(order)
        } just Runs

        orderService.deleteOrder(order.publicId)

        verify {
            orderRepository.delete(order)
        }
    }

    @Test
    fun `deletes order restoring product quantities`() {
        val product = Fixtures.productFixture(quantity = 5)

        val movement = Fixtures.movementFixture(
            product = product,
            material = null,
            quantity = 2
        )

        val order = Fixtures.orderFixture(
            movements = mutableSetOf(movement)
        )

        mockCurrentUserAndOrder(order)

        every {
            productService.changeProductQuantity(product, 7)
        } just Awaits

        every {
            orderRepository.delete(order)
        } just Runs

        orderService.deleteOrder(order.publicId)

        verify {
            productService.changeProductQuantity(product, 7)
            orderRepository.delete(order)
        }
    }

    @Test
    fun `gets order details`() {
        val order = Fixtures.orderFixture()

        val movement1 = Fixtures.movementResponseFixture(
            totalPrice = BigDecimal("10"),
        )

        val movement2 = Fixtures.movementResponseFixture(
            totalPrice = BigDecimal("15")
        )

        mockCurrentUserAndOrder(order)

        every {
            movementService.getMovementsByOrder(order)
        } returns listOf(movement1, movement2)

        val response = orderService.getOrderDetails(order.publicId)

        assertEquals(BigDecimal("25"), response.totalPrice)
        assertEquals(2, response.movements.size)
    }

    @Test
    fun `adds movement to order`() {
        val order = Fixtures.orderFixture()

        val request = CreateMovementRequest(
            productPublicId = UUID.randomUUID(),
            materialPublicId = null,
            quantity = 1,
            notes = null,
        )

        val movement = Fixtures.movementResponseFixture()

        mockCurrentUserAndOrder(order)

        every {
            movementService.createMovement(order, request, user)
        } returns movement

        val response =
            orderService.addMovementToOrder(order.publicId, request)

        assertEquals(movement, response)
    }

    @Test
    fun `throws when completing empty order`() {
        val order = Fixtures.orderFixture(
            movements = mutableSetOf()
        )

        mockCurrentUserAndOrder(order)

        assertThrows<OrderHasNoMovementsException> {
            orderService.completeOrder(order.publicId)
        }
    }

    @Test
    fun `completes product order`() {
        val product = Fixtures.productFixture(quantity = 10)

        val movement = Fixtures.movementFixture(
            product = product,
            quantity = 3
        )

        val order = Fixtures.orderFixture(
            movements = mutableSetOf(movement)
        )

        mockCurrentUserAndOrder(order)

        every {
            productService.changeProductQuantity(product, 7)
        } just Awaits

        every {
            orderRepository.save(order)
        } returns order

        orderService.completeOrder(order.publicId)

        assertTrue(order.isCompleted)

        verify {
            productService.changeProductQuantity(product, 7)
            orderRepository.save(order)
        }
    }

    @Test
    fun `throws when product quantity would become negative`() {
        val product = Fixtures.productFixture(quantity = 1)

        val movement = Fixtures.movementFixture(
            product = product,
            quantity = 2
        )

        val order = Fixtures.orderFixture(
            movements = mutableSetOf(movement)
        )

        mockCurrentUserAndOrder(order)

        assertThrows<NegativeQuantityException> {
            orderService.completeOrder(order.publicId)
        }
    }

    @Test
    fun `completes material order`() {
        val material = Fixtures.materialFixture(quantity = 20)

        val movement = Fixtures.movementFixture(
            material = material,
            product = null,
            quantity = 5
        )

        val order = Fixtures.orderFixture(
            movements = mutableSetOf(movement)
        )

        mockCurrentUserAndOrder(order)

        every {
            materialService.changeMaterialQuantity(material, 25)
        } just Awaits

        every {
            orderRepository.save(order)
        } returns order

        orderService.completeOrder(order.publicId)

        verify {
            materialService.changeMaterialQuantity(material, 25)
        }
    }

    @Test
    fun `gets order`() {
        val order = Fixtures.orderFixture()

        every {
            orderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order

        assertEquals(
            order,
            orderService.getOrder(order.publicId, user)
        )
    }

    @Test
    fun `throws when order does not exist`() {
        val publicId = UUID.randomUUID()

        every {
            orderRepository.findByPublicIdAndUser(publicId, user)
        } returns null

        assertThrows<NotFoundException> {
            orderService.getOrder(publicId, user)
        }
    }



    private fun mockCurrentUser() {
        every { userService.getCurrentUser() } returns user
    }

    private fun mockCurrentUserAndOrder(order: Order) {
        every { userService.getCurrentUser() } returns user
        every {
            orderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order
    }
}