package org.napetrico.backend.productionOrders

import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.EnumSource
import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.common.exceptions.CannotDeleteProductionOrderException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.productionOrders.ProductionOrderRepository
import org.napetrico.backend.features.productionOrders.ProductionOrderService
import org.napetrico.backend.features.productionOrders.dto.CreateProductionOrderRequest
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import org.springframework.scheduling.TaskScheduler
import java.time.Instant
import java.util.UUID
import kotlin.test.Test

class ProductionOrderServiceTest {

    private val productionOrderRepository = mockk<ProductionOrderRepository>()
    private val userService = mockk<UserService>()
    private val productService = mockk<ProductService>()
    private val materialService = mockk<MaterialService>()
    private val taskScheduler = mockk<TaskScheduler>()

    private val service = ProductionOrderService(
        productionOrderRepository,
        userService,
        productService,
        materialService,
        taskScheduler
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `gets production orders`() {
        val order = Fixtures.productionOrderFixture()

        every { userService.getCurrentUser() } returns user
        every { productionOrderRepository.findAllByUser(user) } returns listOf(order)

        val result = service.getAll()

        assertEquals(1, result.size)
    }

    @Test
    fun `creates production order`() {
        val product = Fixtures.productFixture()

        val request = CreateProductionOrderRequest(
            productPublicId = product.publicId,
            quantity = 10,
            notes = null
        )

        every { userService.getCurrentUser() } returns user
        every { productService.getProduct(product.publicId, user) } returns product
        every { productionOrderRepository.save(any()) } answers { firstArg() }

        val response = service.createProductionOrder(request)

        assertEquals(product.description, response.productDescription)
        assertEquals(10, response.quantity)
    }

    @Test
    fun `deletes pending production order`() {
        val order = Fixtures.productionOrderFixture(
            status = ProductionStatus.PENDING
        )

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order
        every { productionOrderRepository.delete(order) } just Runs

        service.deleteProductionOrder(order.publicId)

        verify {
            productionOrderRepository.delete(order)
        }
    }

    @ParameterizedTest
    @EnumSource(
        value = ProductionStatus::class,
        names = ["IN_PROGRESS", "COMPLETED"]
    )
    fun `cannot delete production order after execution`(
        status: ProductionStatus
    ) {
        val order = Fixtures.productionOrderFixture(status = status)

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order

        assertThrows<CannotDeleteProductionOrderException> {
            service.deleteProductionOrder(order.publicId)
        }

        verify(exactly = 0) {
            productionOrderRepository.delete(any())
        }
    }

    @Test
    fun `executes pending production order`() {
        val order = Fixtures.productionOrderFixture(
            status = ProductionStatus.PENDING
        )

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order
        every { productionOrderRepository.save(order) } returns order
        every {
            taskScheduler.schedule(any<Runnable>(), any<Instant>())
        } returns mockk()

        service.executeProductionOrder(order.publicId)

        assertEquals(ProductionStatus.IN_PROGRESS, order.status)

        verify {
            productionOrderRepository.save(order)
            taskScheduler.schedule(any<Runnable>(), any<Instant>())
        }
    }

    @ParameterizedTest
    @EnumSource(
        value = ProductionStatus::class,
        names = ["IN_PROGRESS", "COMPLETED", "FAILED"]
    )
    fun `cannot execute non pending production order`(
        status: ProductionStatus
    ) {
        val order = Fixtures.productionOrderFixture(status = status)

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(order.publicId, user)
        } returns order

        assertThrows<IllegalStateException> {
            service.executeProductionOrder(order.publicId)
        }

        verify(exactly = 0) {
            productionOrderRepository.save(any())
            taskScheduler.schedule(any<Runnable>(), any<Instant>())
        }
    }

    @Test
    fun `completes production order`() {
        val product = Fixtures.productFixture(quantity = 5)

        val productionOrder = Fixtures.productionOrderFixture(
            product = product,
            quantity = 3,
            status = ProductionStatus.IN_PROGRESS
        )

        val recipe = listOf(Fixtures.productMaterialFixture())

        every { userService.getUser(user.publicId) } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        every {
            productService.getProductRecipe(product, user)
        } returns recipe

        every {
            materialService.consumeMaterials(recipe, 3)
        } just Runs

        service.completeProductionOrder(
            productionOrder.publicId,
            user.publicId
        )

        assertEquals(8, product.quantity)
        assertEquals(
            ProductionStatus.COMPLETED,
            productionOrder.status
        )

        verify {
            materialService.consumeMaterials(recipe, 3)
        }
    }

    @Test
    fun `fails production order`() {
        val productionOrder = Fixtures.productionOrderFixture(
            status = ProductionStatus.IN_PROGRESS
        )

        every { userService.getUser(user.publicId) } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        service.failProductionOrder(
            productionOrder.publicId,
            user.publicId,
            RuntimeException("boom")
        )

        assertEquals(
            ProductionStatus.FAILED,
            productionOrder.status
        )
    }

    @Test
    fun `gets production order`() {
        val productionOrder = Fixtures.productionOrderFixture()

        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        val result = service.getProductionOrder(
            productionOrder.publicId,
            user
        )

        assertEquals(productionOrder, result)
    }

    @Test
    fun `throws when production order not found`() {
        val id = UUID.randomUUID()

        every {
            productionOrderRepository.findByPublicIdAndUser(id, user)
        } returns null

        assertThrows<NotFoundException> {
            service.getProductionOrder(id, user)
        }
    }
}
