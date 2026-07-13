package org.napetrico.backend.productionOrders

import io.mockk.*
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.productionOrders.ProductionOrderExecutor
import org.napetrico.backend.features.productionOrders.ProductionOrderRepository
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import java.util.*
import kotlin.test.Test
import kotlin.test.assertEquals

class ProductionOrderExecutorTest {

    private val productionOrderRepository = mockk<ProductionOrderRepository>()
    private val userService = mockk<UserService>()
    private val productService = mockk<ProductService>()
    private val materialService = mockk<MaterialService>()

    private val productionOrderExecutor = ProductionOrderExecutor(
        productionOrderRepository,
        userService,
        productService,
        materialService
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `fails production order`() {
        val productionOrder = Fixtures.productionOrderFixture(
            status = ProductionStatus.IN_PROGRESS
        )

        every {
            userService.getUser(user.publicId)
        } returns user

        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        productionOrderExecutor.failProductionOrder(
            productionOrder.publicId,
            user.publicId
        )

        assertEquals(
            ProductionStatus.FAILED,
            productionOrder.status
        )
    }

    @Test
    fun `throws when user not found while failing production order`() {
        val userId = UUID.randomUUID()

        every {
            userService.getUser(userId)
        } returns null

        assertThrows<NotFoundException> {
            productionOrderExecutor.failProductionOrder(
                UUID.randomUUID(),
                userId
            )
        }
    }

    @Test
    fun `completes production order`() {
        val product = Fixtures.productFixture(
            quantity = 5
        )

        val productionOrder = Fixtures.productionOrderFixture(
            product = product,
            quantity = 3,
            status = ProductionStatus.IN_PROGRESS
        )

        val recipe = listOf(
            Fixtures.productMaterialFixture()
        )

        every {
            userService.getUser(user.publicId)
        } returns user

        every {
            productionOrderRepository.findByPublicIdAndUser(
                productionOrder.publicId,
                user
            )
        } returns productionOrder

        every {
            productService.getProductRecipe(
                product,
                user
            )
        } returns recipe

        every {
            materialService.consumeMaterials(
                recipe,
                3
            )
        } just Runs

        productionOrderExecutor.completeProductionOrder(
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
    fun `throws when user not found while completing production order`() {
        val userId = UUID.randomUUID()

        every {
            userService.getUser(userId)
        } returns null

        assertThrows<NotFoundException> {
            productionOrderExecutor.completeProductionOrder(
                UUID.randomUUID(),
                userId
            )
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

        val result = productionOrderExecutor.getProductionOrder(
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
            productionOrderExecutor.getProductionOrder(id, user)
        }
    }
}
