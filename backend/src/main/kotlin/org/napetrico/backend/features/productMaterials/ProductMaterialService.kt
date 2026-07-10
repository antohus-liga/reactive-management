package org.napetrico.backend.features.productMaterials

import jakarta.transaction.Transactional
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.products.dto.MaterialIngredientResponse
import org.napetrico.backend.features.products.dto.ProductRecipeResponse
import org.napetrico.backend.features.users.User
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class ProductMaterialService(
    private val productMaterialRepository: ProductMaterialRepository,
) {

    @Transactional
    fun getProductRecipeDto(product: Product, user: User): ProductRecipeResponse {
        val productMaterials = productMaterialRepository.findRecipeByProductAndUser(product, user)

        val ingredients = productMaterials.map { pm ->
            MaterialIngredientResponse(
                materialPublicId = pm.material.publicId,
                materialDescription = pm.material.description,
                materialUnitPrice = pm.material.unitPrice.value,
                materialMeasurement = pm.material.measurement,
                quantityNeeded = pm.quantity,
            )
        }.toSet()

        return ProductRecipeResponse(
            productPublicId = product.publicId,
            productDescription = product.description,
            ingredients = ingredients,
            productionCost = product.productionCost.value,
            createdAt = productMaterials.firstOrNull()?.createdAt ?: LocalDateTime.now(),
            updatedAt = productMaterials.lastOrNull()?.updatedAt ?: LocalDateTime.now(),
        )
    }

    fun getTotalCostForProduct(product: Product, user: User): BigDecimal =
        productMaterialRepository.getTotalCostByProductAndUser(product.id, user.id)
            ?: BigDecimal.ZERO

    fun createAllProductMaterials(productMaterial: List<ProductMaterial>) =
        productMaterialRepository.saveAll(productMaterial)

    fun deleteRecipe(product: Product, user: User) = productMaterialRepository.deleteByProductAndUser(product, user)

    @Transactional
    fun getProductRecipe(product: Product, user: User): List<ProductMaterial> =
        productMaterialRepository.findRecipeByProductAndUser(product, user)
}