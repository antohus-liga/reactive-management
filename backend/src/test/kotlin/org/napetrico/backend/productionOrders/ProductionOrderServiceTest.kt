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
import org.napetrico.backend.features.productionOrders.ProductionOrderExecutor
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
    private val taskScheduler = mockk<TaskScheduler>()
    private val productionOrderExecutor = mockk<ProductionOrderExecutor>()

    private val productionOrderService = ProductionOrderService(
        productionOrderRepository,
        userService,
        productService,
        taskScheduler,
        productionOrderExecutor
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `gets production orders`() {
        val productionOrder = Fixtures.productionOrderFixture()

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findAllByUserOrderByCreatedAtDesc(user)
        } returns listOf(productionOrder)

        val response = productionOrderService.getAll()

        assertEquals(1, response.size)
    }

    @Test
    fun `creates production order`() {
        val product = Fixtures.productFixture()

        val request = CreateProductionOrderRequest(
            productPublicId = product.publicId,
            quantity = 5,
            null
        )

        every { userService.getCurrentUser() } returns user
        every {
            productService.getProduct(product.publicId, user)
        } returns product

        every {
            productionOrderRepository.save(any())
        } answers { firstArg() }

        val response = productionOrderService.createProductionOrder(request)

        assertEquals(product.description, response.productDescription)
        assertEquals(5, response.quantity)
    }

    @Test
    fun `deletes pending production order`() {
        val productionOrder = Fixtures.productionOrderFixture(
            status = ProductionStatus.PENDING
        )

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        every {
            productionOrderRepository.delete(productionOrder)
        } just Runs

        productionOrderService.deleteProductionOrder(productionOrder.publicId)

        verify {
            productionOrderRepository.delete(productionOrder)
        }
    }

    @ParameterizedTest
    @EnumSource(
        value = ProductionStatus::class,
        names = ["IN_PROGRESS", "COMPLETED"]
    )
    fun `throws when deleting production order in invalid state`(
        status: ProductionStatus
    ) {
        val productionOrder = Fixtures.productionOrderFixture(
            status = status
        )

        every { userService.getCurrentUser() } returns user
        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        assertThrows<CannotDeleteProductionOrderException> {
            productionOrderService.deleteProductionOrder(productionOrder.publicId)
        }

        verify(exactly = 0) {
            productionOrderRepository.delete(any())
        }
    }

    @Test
    fun `executes production order`() {
        val productionOrder = Fixtures.productionOrderFixture(
            status = ProductionStatus.PENDING
        )

        every { userService.getCurrentUser() } returns user

        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        every {
            productionOrderRepository.save(productionOrder)
        } returns productionOrder

        every {
            taskScheduler.schedule(any<Runnable>(), any<Instant>())
        } returns mockk()

        productionOrderService.executeProductionOrder(productionOrder.publicId)

        assertEquals(
            ProductionStatus.IN_PROGRESS,
            productionOrder.status
        )

        verify {
            productionOrderRepository.save(productionOrder)
            taskScheduler.schedule(any<Runnable>(), any<Instant>())
        }
    }

    @ParameterizedTest
    @EnumSource(
        value = ProductionStatus::class,
        names = ["IN_PROGRESS", "COMPLETED", "FAILED"]
    )
    fun `throws when executing production order not pending`(
        status: ProductionStatus
    ) {
        val productionOrder = Fixtures.productionOrderFixture(
            status = status
        )

        every { userService.getCurrentUser() } returns user

        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        assertThrows<IllegalStateException> {
            productionOrderService.executeProductionOrder(
                productionOrder.publicId
            )
        }

        verify(exactly = 0) {
            productionOrderRepository.save(any())
            taskScheduler.schedule(any<Runnable>(), any<Instant>())
        }
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

        val result = productionOrderService.getProductionOrder(
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
            productionOrderService.getProductionOrder(id, user)
        }
    }
}

