package org.napetrico.backend.features.products.dto

import jakarta.validation.Valid
import jakarta.validation.constraints.NotEmpty

data class ProductRecipeRequest(
    @field:NotEmpty
    @field:Valid
    val ingredients: Set<MaterialIngredientRequest>,
)
