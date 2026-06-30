package org.napetrico.backend.productMaterials

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.productMaterials.ProductMaterialRepository
import org.napetrico.backend.features.productMaterials.ProductMaterialService
import org.napetrico.backend.helper.Fixtures
import java.math.BigDecimal
import kotlin.test.Test

class ProductMaterialServiceTest {

    private val productMaterialRepository = mockk<ProductMaterialRepository>()

    private val productMaterialService = ProductMaterialService(
        productMaterialRepository
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `gets product recipe`() {
        val product = Fixtures.productFixture()

        val flour = Fixtures.materialFixture(
            description = "Flour",
            unitPrice = Price.from(BigDecimal("2.50"))
        )

        val sugar = Fixtures.materialFixture(
            description = "Sugar",
            unitPrice = Price.from(BigDecimal("3.00"))
        )

        val pm1 = Fixtures.productMaterialFixture(
            product = product,
            material = flour,
            quantity = 2,
        )

        val pm2 = Fixtures.productMaterialFixture(
            product = product,
            material = sugar,
            quantity = 3,
        )

        every {
            productMaterialRepository.findRecipeByProductAndUser(product, user)
        } returns listOf(pm1, pm2)

        every {
            productMaterialRepository.getAllByProductAndUserOrderByCreatedAt(product, user)
        } returns listOf(pm1, pm2)

        every {
            productMaterialRepository.getTotalCostByProductAndUser(product.id, user.id)
        } returns BigDecimal("14.00")

        product.productionCost = Price.from(productMaterialService.getTotalCostForProduct(product, user))
        val response = productMaterialService.getProductRecipeDto(product, user)

        assertEquals(product.publicId, response.productPublicId)
        assertEquals(product.description, response.productDescription)

        assertEquals(2, response.ingredients.size)

        assertTrue(
            response.ingredients.any {
                it.materialDescription == "Flour" &&
                        it.quantityNeeded == 2 &&
                        it.materialUnitPrice == BigDecimal("2.50")
            }
        )

        assertTrue(
            response.ingredients.any {
                it.materialDescription == "Sugar" &&
                        it.quantityNeeded == 3 &&
                        it.materialUnitPrice == BigDecimal("3.00")
            }
        )

        assertEquals(BigDecimal("14.00"), response.productionCost)
        assertEquals(pm1.createdAt, response.createdAt)
        assertEquals(pm2.createdAt, response.updatedAt)
    }

    @Test
    fun `throws when recipe is empty`() {
        val product = Fixtures.productFixture()

        every {
            productMaterialRepository.findRecipeByProductAndUser(product, user)
        } returns emptyList()

        assertThrows<NotFoundException> {
            productMaterialService.getProductRecipeDto(product, user)
        }

        verify(exactly = 0) {
            productMaterialRepository.getAllByProductAndUserOrderByCreatedAt(any(), any())
        }
    }

    @Test
    fun `gets total cost for product`() {
        val product = Fixtures.productFixture()

        every {
            productMaterialRepository.getTotalCostByProductAndUser(product.id, user.id)
        } returns BigDecimal("18.75")

        val result = productMaterialService.getTotalCostForProduct(product, user)

        assertEquals(BigDecimal("18.75"), result)
    }

    @Test
    fun `throws when total cost does not exist`() {
        val product = Fixtures.productFixture()

        every {
            productMaterialRepository.getTotalCostByProductAndUser(product.id, user.id)
        } returns null

        assertThrows<NotFoundException> {
            productMaterialService.getTotalCostForProduct(product, user)
        }
    }
}
