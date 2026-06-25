package org.napetrico.backend.features.productMaterials

import jakarta.transaction.Transactional
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.products.dto.MaterialIngredientResponse
import org.napetrico.backend.features.products.dto.ProductRecipeResponse
import org.napetrico.backend.features.users.User
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class ProductMaterialService(
    private val productMaterialRepository: ProductMaterialRepository,
) {

    @Transactional
    fun getProductRecipe(product: Product, user: User): ProductRecipeResponse {
        val productMaterials = productMaterialRepository.getAllByProductAndUserOrderByUpdatedAt(product, user)
            ?: throw NotFoundException("Product '${product.description}' data")
        val firstProduct = productMaterialRepository.getAllByProductAndUserOrderByCreatedAt(product, user)!!.first()

        val ingredients = productMaterials.map { pm ->
            MaterialIngredientResponse(
                materialPublicId = pm.material.publicId,
                materialDescription = pm.material.description,
                materialUnitPrice = pm.material.unitPrice.value,
                quantityNeeded = pm.quantity,
            )
        }.toSet()

        return ProductRecipeResponse(
            productPublicId = product.publicId,
            productDescription = product.description,
            ingredients = ingredients,
            productionCost = productMaterials.fold(BigDecimal.ZERO) { acc, pm ->
                acc + pm.material.unitPrice.value.multiply(BigDecimal(pm.quantity))
            },
            createdAt = firstProduct.createdAt,
            updatedAt = productMaterials.last().createdAt,
        )
    }

    fun getTotalCostForProduct(product: Product, user: User): BigDecimal =
        productMaterialRepository.getTotalCostByProductAndUser(product.id, user.id)
            ?: throw NotFoundException("Product recipe data")

    fun createAllProductMaterials(productMaterial: List<ProductMaterial>) =
        productMaterialRepository.saveAll(productMaterial)

    fun deleteRecipe(product: Product, user: User) = productMaterialRepository.deleteByProductAndUser(product, user)
}