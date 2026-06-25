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
import org.napetrico.backend.features.products.dto.CreateProductRecipeRequest
import org.napetrico.backend.features.products.dto.CreateProductRequest
import org.napetrico.backend.features.products.dto.MaterialIngredientResponse
import org.napetrico.backend.features.products.dto.ProductRecipeResponse
import org.napetrico.backend.features.products.dto.ProductRequest
import org.napetrico.backend.features.products.dto.ProductResponse
import org.napetrico.backend.features.products.dto.UpdateProductRequest
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID
import kotlin.collections.sumOf

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

        return productRepository.save(
            request.toEntity(user, category)
        ).let {
            it.toResponse(Price.from(productMaterialService.getTotalCostForProduct(it, user)))
        }
    }

    fun updateProduct(publicId: UUID, request: UpdateProductRequest): ProductResponse {
        val user = userService.getCurrentUser()
        val product = productRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Product")
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category, product)

        return productRepository.save(
            product.applyUpdate(request, category)
        ).let {
            it.toResponse(Price.from(productMaterialService.getTotalCostForProduct(it, user)))
        }

    }

    @Transactional
    fun deleteProduct(publicId: UUID) =
        productRepository.deleteByPublicIdAndUser(publicId, userService.getCurrentUser())

    @Transactional
    fun createProductRecipe(request: CreateProductRecipeRequest): ProductRecipeResponse {
        val user = userService.getCurrentUser()
        val product = productRepository.findByPublicIdAndUser(request.productPublicId, user)
            ?: throw NotFoundException("Product")
        val materials = materialService.getAllByPublicIds(request.ingredients.map { it.materialPublicId })

        val materialMap = materials.associateBy { it.publicId }

        val productMaterials = request.ingredients.map { ingredient ->

            val material = materialMap[ingredient.materialPublicId]
                ?: throw NotFoundException("Material")

            ProductMaterial(
                product = product,
                material = material,
                quantity = ingredient.quantity,
                user = user,
            )
        }
        productMaterialService.createAllProductMaterials(productMaterials)

        val ingredientResponses = productMaterials.map {
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
            productionCost = productMaterials.fold(BigDecimal.ZERO) { acc, pm ->
                acc + pm.material.unitPrice.value.multiply(BigDecimal(pm.material.quantity))
            },
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now(),
        )
    }

    fun getProductRecipe(publicId: UUID): ProductRecipeResponse {
        val user = userService.getCurrentUser()
        val product = productRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Product")

        return productMaterialService.getProductRecipe(product, user)
    }

    private fun validateRequest(request: ProductRequest, user: User, category: Category, product: Product? = null) {
        if (!((request.fixedPrice != null) xor (request.sellingMargin != null)))
            throw IllegalArgumentException("Exactly one of fixedPrice or sellingMargin must be provided.")

        val conflict = productRepository.findByDescriptionAndFixedPriceAndSellingMarginAndUser(
            request.description,
            request.fixedPrice,
            request.sellingMargin?.let { SellingMarginParser.parseToBigDecimal(it) },
            user
        )

        if (
            conflict != null &&
            (request !is UpdateProductRequest || conflict.id != product?.id)
        ) {
            throw AlreadyExistsException(
                "Product with description ${request.description} and " +
                        (request.sellingMargin?.let { "selling margin $it" }
                            ?: "fixed price ${request.fixedPrice}")
            )
        }

        if (category.type == CategoryType.MATERIAL)
            throw IllegalArgumentException("${category.name} category cannot be used because it's a material category.")
    }
}