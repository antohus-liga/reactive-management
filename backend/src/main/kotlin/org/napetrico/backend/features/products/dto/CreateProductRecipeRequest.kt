package org.napetrico.backend.features.products.dto

import java.util.UUID

data class CreateProductRecipeRequest(
    val productPublicId: UUID,
    val ingredients: Set<IngredientRequest>,
)
