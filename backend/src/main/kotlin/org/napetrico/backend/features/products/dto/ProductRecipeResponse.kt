package org.napetrico.backend.features.products.dto

import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class ProductRecipeResponse(
    val productPublicId: UUID,
    val productDescription: String,
    val ingredients: Set<MaterialIngredientResponse>,
    val productionCost: BigDecimal,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)