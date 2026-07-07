package org.napetrico.backend.products

import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.enums.MeasurementType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.categories.CategoryService
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.productMaterials.ProductMaterialService
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.products.ProductRepository
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.products.dto.CreateProductRequest
import org.napetrico.backend.features.products.dto.MaterialIngredientRequest
import org.napetrico.backend.features.products.dto.ProductRecipeRequest
import org.napetrico.backend.features.products.dto.UpdateProductRequest
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import java.math.BigDecimal
import java.util.UUID
import kotlin.test.Test

class ProductServiceTest {

    private val productRepository = mockk<ProductRepository>()
    private val productMaterialService = mockk<ProductMaterialService>()
    private val materialService = mockk<MaterialService>()
    private val categoryService = mockk<CategoryService>()
    private val userService = mockk<UserService>()

    private val productService = ProductService(
        productRepository,
        productMaterialService,
        materialService,
        categoryService,
        userService
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `creates product`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))

        val request = CreateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("10.00"),
            sellingMargin = null,
        )

        mockCurrentUserAndCategory(category)
        every { productRepository.findByDescriptionAndUser(request.description, user) } returns null

        every { productRepository.save(any()) } answers { firstArg() }

        val response = productService.createProduct(request)

        assertEquals("Coffee", response.description)
        assertEquals(BigDecimal.ZERO, response.productionCost)

        verify { productRepository.save(any()) }
    }

    @Test
    fun `throws when product description already exists on create`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))

        val request = CreateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("10"),
            sellingMargin = null,
        )

        mockCurrentUserAndCategory(category)

        every {
            productRepository.findByDescriptionAndUser(request.description, user)
        } returns Fixtures.productFixture(description = "Coffee")

        assertThrows<AlreadyExistsException> { productService.createProduct(request) }

        verify(exactly = 0) { productRepository.save(any()) }
    }

    @Test
    fun `throws when both fixed price and selling margin are provided`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))

        val request = CreateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("10"),
            sellingMargin = "25%",
        )

        mockCurrentUserAndCategory(category)

        assertThrows<IllegalArgumentException> { productService.createProduct(request) }

        verify(exactly = 0) { productRepository.save(any()) }
    }

    @Test
    fun `throws when no pricing strategy is provided`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))

        val request = CreateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = null,
            sellingMargin = null,
        )

        mockCurrentUserAndCategory(category)

        assertThrows<IllegalArgumentException> { productService.createProduct(request) }
    }

    @Test
    fun `throws when category is material`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.MATERIAL))

        val request = CreateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("10"),
            sellingMargin = null,
        )

        mockCurrentUserAndCategory(category)
        every { productRepository.findByDescriptionAndUser(request.description, user) } returns null

        assertThrows<IllegalArgumentException> { productService.createProduct(request) }

        verify(exactly = 0) { productRepository.save(any()) }
    }

    @Test
    fun `updates product with fixed price`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))
        val product = Fixtures.productFixture(category = category, fixedPrice = Price.from("1"))

        val request = UpdateProductRequest(
            description = "Updated",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("25.00"),
            sellingMargin = null,
            quantity = 10
        )

        mockCurrentUserProductAndCategory(product, category)

        every { productRepository.findByDescriptionAndUser(request.description, user) } returns null

        every { productMaterialService.getTotalCostForProduct(product, user) } returns BigDecimal("8.50")

        every { productRepository.save(any()) } answers { firstArg() }

        val response = productService.updateProduct(product.publicId, request)

        assertEquals("Updated", response.description)
        assertEquals(BigDecimal("8.50"), response.productionCost)
    }

    @Test
    fun `updates product with same description`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))
        val product = Fixtures.productFixture(fixedPrice = Price.from("1"), description = "Coffee")

        val request = UpdateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("20"),
            sellingMargin = null,
            quantity = 10
        )

        mockCurrentUserProductAndCategory(product, category)

        every { productRepository.findByDescriptionAndUser(request.description, user) } returns product

        every { productMaterialService.getTotalCostForProduct(product, user) } returns BigDecimal.ZERO

        every { productRepository.save(any()) } answers { firstArg() }

        productService.updateProduct(product.publicId, request)

        verify { productRepository.save(any()) }
    }

    @Test
    fun `throws when product description already exists on edit`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))
        val product = Fixtures.productFixture(description = "Old")
        val conflict = Fixtures.productFixture(id = 1, description = "Coffee")

        val request = UpdateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("20"),
            sellingMargin = null,
            quantity = 10
        )

        mockCurrentUserProductAndCategory(product, category)

        every { productRepository.findByDescriptionAndUser(request.description, user) } returns conflict

        assertThrows<AlreadyExistsException> { productService.updateProduct(product.publicId, request) }

        verify(exactly = 0) { productRepository.save(any()) }
    }

    @Test
    fun `throws when category is material on edit`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.MATERIAL))
        val product = Fixtures.productFixture()

        val request = UpdateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("20"),
            sellingMargin = null,
            quantity = 10
        )

        mockCurrentUserProductAndCategory(product, category)

        every { productRepository.findByDescriptionAndUser(request.description, user) } returns null

        assertThrows<IllegalArgumentException> { productService.updateProduct(product.publicId, request) }
    }

    @Test
    fun `throws when both pricing strategies are provided`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))
        val product = Fixtures.productFixture()

        val request = UpdateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = BigDecimal("10"),
            sellingMargin = "20%",
            quantity = 10
        )

        mockCurrentUserProductAndCategory(product, category)

        assertThrows<IllegalArgumentException> { productService.updateProduct(product.publicId, request) }
    }

    @Test
    fun `throws when neither pricing strategy is provided`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))
        val product = Fixtures.productFixture()

        val request = UpdateProductRequest(
            description = "Coffee",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            fixedPrice = null,
            sellingMargin = null,
            quantity = 10
        )

        mockCurrentUserProductAndCategory(product, category)

        assertThrows<IllegalArgumentException> { productService.updateProduct(product.publicId, request) }
    }

    @Test
    fun `deletes product`() {
        val publicId = UUID.randomUUID()

        every { userService.getCurrentUser() } returns user
        every { productRepository.deleteByPublicIdAndUser(publicId, user) } just Runs

        productService.deleteProduct(publicId)

        verify { productRepository.deleteByPublicIdAndUser(publicId, user) }
    }

    @Test
    fun `throws when product recipe product does not exist`() {
        val publicId = UUID.randomUUID()

        every { userService.getCurrentUser() } returns user
        every { productRepository.findByPublicIdAndUser(publicId, user) } returns null

        assertThrows<NotFoundException> { productService.getProductRecipeDto(publicId) }
    }

    @Test
    fun `gets product`() {
        val product = Fixtures.productFixture()

        every { productRepository.findByPublicIdAndUser(product.publicId, user) } returns product

        val result = productService.getProduct(product.publicId, user)

        assertEquals(product, result)
    }

    @Test
    fun `throws when product does not exist`() {
        val publicId = UUID.randomUUID()

        every { productRepository.findByPublicIdAndUser(publicId, user) } returns null

        assertThrows<NotFoundException> { productService.getProduct(publicId, user) }
    }

    @Test
    fun `changes product quantity`() {
        val product = Fixtures.productFixture(quantity = 2)

        every { productRepository.save(product) } answers { firstArg() }

        productService.changeProductQuantity(product, 10)

        assertEquals(10, product.quantity)

        verify { productRepository.save(product) }
    }

    @Test
    fun `replaces recipe`() {
        val product = Fixtures.productFixture(fixedPrice = Price.from("1"), productionCost = Price.from(BigDecimal("999.99")))
        val material = Fixtures.materialFixture(unitPrice = Price.from(BigDecimal(10)))

        val request = ProductRecipeRequest(
            ingredients = setOf(
                MaterialIngredientRequest(
                    material.publicId,
                    2
                )
            )
        )

        val productMaterial = Fixtures.productMaterialFixture(
            product = product,
            material = material,
            quantity = 2
        )

        every { userService.getCurrentUser() } returns user
        every { productRepository.findByPublicIdAndUser(product.publicId, user) } returns product

        every { productMaterialService.deleteRecipe(product, user) } just Runs
        every {
            productMaterialService.getTotalCostForProduct(product, user)
        } returns material.unitPrice.value.multiply(BigDecimal(productMaterial.quantity))

        every { materialService.getAllByPublicIds(any()) } returns listOf(material)

        every { productMaterialService.createAllProductMaterials(any()) } returns listOf(productMaterial)

        val response = productService.replaceRecipe(product.publicId, request)

        assertEquals(product.publicId, response.productPublicId)
        assertEquals(1, response.ingredients.size)
        assertEquals(BigDecimal(20), response.productionCost)

        verify {
            productMaterialService.deleteRecipe(product, user)
            productMaterialService.createAllProductMaterials(any())
        }
    }

    @Test
    fun `throws when recipe material does not exist`() {
        val product = Fixtures.productFixture()
        val materialId = UUID.randomUUID()

        val request = ProductRecipeRequest(
            ingredients = setOf(
                MaterialIngredientRequest(materialId, 1)
            )
        )

        every { userService.getCurrentUser() } returns user
        every { productRepository.findByPublicIdAndUser(product.publicId, user) } returns product

        every { productMaterialService.deleteRecipe(product, user) } just Runs

        every { materialService.getAllByPublicIds(any()) } returns emptyList()

        assertThrows<NotFoundException> { productService.replaceRecipe(product.publicId, request) }
    }

    private fun mockCurrentUserAndCategory(category: Category) {
        every { userService.getCurrentUser() } returns user
        every { categoryService.getCategory(category.publicId) } returns category
    }

    private fun mockCurrentUserProductAndCategory(product: Product, category: Category) {
        every { userService.getCurrentUser() } returns user
        every { categoryService.getCategory(category.publicId) } returns category
        every { productRepository.findByPublicIdAndUser(product.publicId, user) } returns product
    }
}