package org.napetrico.backend.orders

import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.MovementType
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.companies.CompanyService
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.movements.MovementService
import org.napetrico.backend.features.orders.OrderRepository
import org.napetrico.backend.features.orders.OrderService
import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.orders.dto.CreateOrderRequest
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

    private val service = OrderService(
        orderRepository,
        userService,
        movementService,
        companyService,
        productService,
        materialService
    )

    private val user = Fixtures.userFixture()

    // ----------------------------
    // GET ORDERS
    // ----------------------------

    @Test
    fun `gets orders`() {
        val order = Fixtures.orderFixture()

        every { userService.getCurrentUser() } returns user
        every { orderRepository.findAllByUserOrderByCreatedAtDesc(user) } returns listOf(order)

        val result = service.getOrders()

        assertEquals(1, result.size)
    }

    // ----------------------------
    // CREATE ORDER
    // ----------------------------

    @Test
    fun `creates order`() {
        val company = Fixtures.companyFixture(companyName = "ABC")
        company.roles  = mutableSetOf(CompanyRole.CLIENT)

        val request = CreateOrderRequest(
            companyPublicId = company.publicId,
            withRole = CompanyRole.CLIENT
        )

        every { userService.getCurrentUser() } returns user
        every { companyService.getCompany(company.publicId, user) } returns company
        every { orderRepository.save(any()) } answers { firstArg() }

        val result = service.createOrder(request)

        assertEquals(company.companyName, result.companyName)
    }

    @Test
    fun `throws when company does not have role`() {
        val company = Fixtures.companyFixture()
        company.roles = mutableSetOf()

        val request = CreateOrderRequest(
            companyPublicId = company.publicId,
            withRole = CompanyRole.CLIENT
        )

        every { userService.getCurrentUser() } returns user
        every { companyService.getCompany(company.publicId, user) } returns company

        assertThrows<IllegalArgumentException> {
            service.createOrder(request)
        }

        verify(exactly = 0) { orderRepository.save(any()) }
    }

    // ----------------------------
    // ORDER DETAILS
    // ----------------------------

    @Test
    fun `gets order details`() {
        val order = Fixtures.orderFixture()

        val movement = Fixtures.movementResponseFixture(
            totalPrice = BigDecimal("10")
        )

        every { userService.getCurrentUser() } returns user
        every { orderRepository.findByPublicIdAndUser(order.publicId, user) } returns order
        every { movementService.getMovementsByOrder(order) } returns listOf(movement)

        val result = service.getOrderDetails(order.publicId)

        assertEquals(BigDecimal("10"), result.totalPrice)
    }

    // ----------------------------
    // ADD MOVEMENT
    // ----------------------------

    @Test
    fun `adds movement to order`() {
        val order = Fixtures.orderFixture()

        val request = CreateMovementRequest(
            movementType = MovementType.INBOUND,
            productPublicId = UUID.randomUUID(),
            materialPublicId = null,
            quantity = 1,
            notes = null,
            discount = null
        )

        val movementResponse = Fixtures.movementResponseFixture()

        every { userService.getCurrentUser() } returns user
        every { orderRepository.findByPublicIdAndUser(order.publicId, user) } returns order
        every { movementService.createMovement(order, request, user) } returns movementResponse

        val result = service.addMovementToOrder(order.publicId, request)

        assertEquals(movementResponse, result)
    }

    // ----------------------------
    // COMPLETE ORDER
    // ----------------------------

    @Test
    fun `completes order`() {
        val product = Fixtures.productFixture(quantity = 10)

        val movement = Fixtures.movementFixture(
            product = product,
            material = null,
            quantity = 3,
            movementType = MovementType.OUTBOUND
        )

        val order = Fixtures.orderFixture(
            movements = mutableSetOf(movement)
        )

        every { userService.getCurrentUser() } returns user
        every { orderRepository.findByPublicIdAndUser(order.publicId, user) } returns order
        every { productService.changeProductQuantity(product, product.quantity - movement.quantity) } returns product
        every { orderRepository.save(order) } returns order

        service.completeOrder(order.publicId)

        assertTrue(order.isCompleted)
        assertEquals(true, order.completedAt != null)

        verify {
            productService.changeProductQuantity(product, product.quantity - movement.quantity)
            orderRepository.save(order)
        }
    }

    // ----------------------------
    // DELETE ORDER
    // ----------------------------

    @Test
    fun `deletes order and reverts quantities`() {
        val product = Fixtures.productFixture(quantity = 10)

        val movement = Fixtures.movementFixture(
            product = product,
            material = null,
            quantity = 3,
            movementType = MovementType.OUTBOUND
        )

        val order = Fixtures.orderFixture(
            movements = mutableSetOf(movement),
            isCompleted = true
        )

        every { userService.getCurrentUser() } returns user
        every { orderRepository.findByPublicIdAndUser(order.publicId, user) } returns order
        every { productService.changeProductQuantity(product, product.quantity + movement.quantity) } returns product
        every { movementService.deleteMovement(movement.publicId, user) } just Runs
        every { orderRepository.delete(order) } just Runs

        service.deleteOrder(order.publicId)

        verify {
            productService.changeProductQuantity(product, product.quantity + movement.quantity)
            movementService.deleteMovement(movement.publicId, user)
            orderRepository.delete(order)
        }
    }

    // ----------------------------
    // DELETE MOVEMENT WRAPPER
    // ----------------------------

    @Test
    fun `deletes movement via service`() {
        val id = UUID.randomUUID()
        val order = Fixtures.orderFixture()

        every { userService.getCurrentUser() } returns user
        every { movementService.deleteMovement(id, user) } just Runs
        every { orderRepository.findByPublicIdAndUser(order.publicId, user) } returns order

        service.deleteMovement(order.publicId, id)

        verify {
            movementService.deleteMovement(id, user)
        }
    }

    @Test
    fun `throws on delete movement via service when order completed`() {
        val id = UUID.randomUUID()
        val order = Fixtures.orderFixture()

        every { userService.getCurrentUser() } returns user
        every { movementService.deleteMovement(id, user) } just Runs
        every { orderRepository.findByPublicIdAndUser(order.publicId, user) } returns order

        service.deleteMovement(order.publicId, id)

        verify {
            movementService.deleteMovement(id, user)
        }
    }

    // ----------------------------
    // INTERNAL GET ORDER
    // ----------------------------

    @Test
    fun `gets order`() {
        val order = Fixtures.orderFixture()

        every {
            orderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order

        val result = service.getOrder(order.publicId, user)

        assertEquals(order, result)
    }

    @Test
    fun `throws when order not found`() {
        val id = UUID.randomUUID()

        every {
            orderRepository.findByPublicIdAndUser(id, user)
        } returns null

        assertThrows<NotFoundException> {
            service.getOrder(id, user)
        }
    }
}

