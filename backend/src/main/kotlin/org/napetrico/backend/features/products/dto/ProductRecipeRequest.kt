package org.napetrico.backend.features.products.dto

import jakarta.validation.Valid

data class ProductRecipeRequest(
    @field:Valid
    val ingredients: Set<MaterialIngredientRequest>,
)
