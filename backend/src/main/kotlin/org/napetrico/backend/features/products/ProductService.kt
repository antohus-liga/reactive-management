package org.napetrico.backend.features.products

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.parsers.SellingMarginParser
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.categories.CategoryService
import org.napetrico.backend.features.products.ProductMapper.applyUpdate
import org.napetrico.backend.features.products.ProductMapper.toEntity
import org.napetrico.backend.features.products.ProductMapper.toResponse
import org.napetrico.backend.features.products.dto.CreateProductRequest
import org.napetrico.backend.features.products.dto.ProductRequest
import org.napetrico.backend.features.products.dto.ProductResponse
import org.napetrico.backend.features.products.dto.UpdateProductRequest
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.UUID

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val categoryService: CategoryService,
    private val userService: UserService,
) {

    fun getAllByUser(): List<ProductResponse> =
        productRepository.findAllByUser(
            userService.getCurrentUser()
        ).map {
            it.toResponse(
                productionCost = Price(BigDecimal(1)) // TODO: calculate total price with product_materials data
            )
        }

    fun createProduct(request: CreateProductRequest): ProductResponse {
        val user = userService.getCurrentUser()
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category)

        return productRepository.save(
            request.toEntity(user, category)
        ).toResponse(
            productionCost = Price(BigDecimal(1)) // TODO: calculate total price with product_materials data
        )
    }

    fun updateProduct(publicId: UUID, request: UpdateProductRequest): ProductResponse {
        val user = userService.getCurrentUser()
        val product = productRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Product")
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category, product)

        return productRepository.save(
            product.applyUpdate(request, category)
        ).toResponse(
            productionCost = Price(BigDecimal(1)) // TODO: calculate total price with product_materials data
        )

    }

    @Transactional
    fun deleteProduct(publicId: UUID) =
        productRepository.deleteByPublicIdAndUser(publicId, userService.getCurrentUser())

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