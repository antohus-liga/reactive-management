package org.napetrico.backend.features.products.dto

data class ProductRecipeRequest(
    val ingredients: Set<MaterialIngredientRequest>,
)
