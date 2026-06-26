package org.napetrico.backend.features.products

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.parsers.SellingMarginParser
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.categories.CategoryService
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.productMaterials.ProductMaterial
import org.napetrico.backend.features.productMaterials.ProductMaterialService
import org.napetrico.backend.features.products.ProductMapper.applyUpdate
import org.napetrico.backend.features.products.ProductMapper.toEntity
import org.napetrico.backend.features.products.ProductMapper.toResponse
import org.napetrico.backend.features.products.dto.ProductRecipeRequest
import org.napetrico.backend.features.products.dto.CreateProductRequest
import org.napetrico.backend.features.products.dto.MaterialIngredientRequest
import org.napetrico.backend.features.products.dto.MaterialIngredientResponse
import org.napetrico.backend.features.products.dto.ProductRecipeResponse
import org.napetrico.backend.features.products.dto.ProductRequest
import org.napetrico.backend.features.products.dto.ProductResponse
import org.napetrico.backend.features.products.dto.UpdateProductRequest
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.math.RoundingMode
import java.time.LocalDateTime
import java.util.UUID
import kotlin.plus
import kotlin.times

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val productMaterialService: ProductMaterialService,
    private val materialService: MaterialService,
    private val categoryService: CategoryService,
    private val userService: UserService,
) {

    fun getAllByUser(): List<ProductResponse> {
        val user = userService.getCurrentUser()

        return productRepository.findAllByUser(user).map {
            it.toResponse(Price.from(productMaterialService.getTotalCostForProduct(it, user)))
        }
    }

    fun createProduct(request: CreateProductRequest): ProductResponse {
        val user = userService.getCurrentUser()
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category)

        val product = request.toEntity(user, category)

        return productRepository.save(product).toResponse(Price.from(BigDecimal(0)))
    }

    fun updateProduct(publicId: UUID, request: UpdateProductRequest): ProductResponse {
        val user = userService.getCurrentUser()
        val product = getProduct(publicId, user)
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category, product)

        val productionCost = productMaterialService.getTotalCostForProduct(product, user)
        val price: BigDecimal = getPrice(request, productionCost)

        return productRepository.save(
            product.applyUpdate(request, category, Price.from(price))
        ).toResponse(Price.from(productionCost))

    }

    @Transactional
    fun deleteProduct(publicId: UUID) =
        productRepository.deleteByPublicIdAndUser(publicId, userService.getCurrentUser())

    @Transactional
    fun replaceRecipe(productPublicId: UUID, request: ProductRecipeRequest): ProductRecipeResponse {
        val user = userService.getCurrentUser()
        val product = getProduct(productPublicId, user)

        val pms = replaceProductMaterials(product, request.ingredients, user)
        return getProductRecipeResponseFromProductMaterials(product, pms)
    }

    fun getProductRecipe(publicId: UUID): ProductRecipeResponse {
        val user = userService.getCurrentUser()
        val product = getProduct(publicId, user)
            ?: throw NotFoundException("Product")

        return productMaterialService.getProductRecipe(product, user)
    }

    private fun validateRequest(request: ProductRequest, user: User, category: Category, product: Product? = null) {
        if (!((request.fixedPrice != null) xor (request.sellingMargin != null)))
            throw IllegalArgumentException("Exactly one of fixedPrice or sellingMargin must be provided.")

        val conflict = productRepository.findByDescriptionAndUser(
            request.description,
            user
        )

        if (
            conflict != null &&
            (request !is UpdateProductRequest || conflict.id != product?.id)
        ) {
            throw AlreadyExistsException(
                "Product with description ${request.description}"
            )
        }

        if (category.type == CategoryType.MATERIAL)
            throw IllegalArgumentException("${category.name} category cannot be used because it's a material category.")
    }

    private fun replaceProductMaterials(
        product: Product,
        ingredients: Set<MaterialIngredientRequest>,
        user: User
    ): List<ProductMaterial> {
        productMaterialService.deleteRecipe(product, user)

        val materials = materialService.getAllByPublicIds(ingredients.map { it.materialPublicId })
        val materialMap = materials.associateBy { it.publicId }

        val productMaterials = ingredients.map { ingredient ->

            val material = materialMap[ingredient.materialPublicId]
                ?: throw NotFoundException("Material")

            ProductMaterial(
                product = product,
                material = material,
                quantity = ingredient.quantity,
                user = user,
            )
        }
        return productMaterialService.createAllProductMaterials(productMaterials)
    }

    private fun getProductRecipeResponseFromProductMaterials(
        product: Product,
        pms: List<ProductMaterial>,
    ): ProductRecipeResponse {
        val ingredientResponses = pms.map {
            MaterialIngredientResponse(
                materialPublicId = it.material.publicId,
                materialDescription = it.material.description,
                materialUnitPrice = it.material.unitPrice.value,
                quantityNeeded = it.quantity
            )
        }.toSet()

        return ProductRecipeResponse(
            productPublicId = product.publicId,
            productDescription = product.description,
            ingredients = ingredientResponses,
            productionCost = pms.fold(BigDecimal.ZERO) { acc, pm ->
                acc + pm.material.unitPrice.value.multiply(BigDecimal(pm.quantity))
            },
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now(),
        )
    }

    private fun getPrice(request: ProductRequest, productionCost: BigDecimal): BigDecimal =
        request.fixedPrice
            ?: (
                    productionCost * (
                            BigDecimal(1) + SellingMarginParser.parseToBigDecimal(request.sellingMargin!!)
                            )
                    ).setScale(
                    2,
                    RoundingMode.HALF_UP
                )

    // Internal function, don't use in controllers
    fun getProduct(publicId: UUID, user: User): Product =
        productRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Product")

    fun changeProductQuantity(product: Product, quantity: Int) =
        productRepository.save(product.apply { this.quantity = quantity })
}