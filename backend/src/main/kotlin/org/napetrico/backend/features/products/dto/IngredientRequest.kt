package org.napetrico.backend.features.products.dto

import java.util.UUID

data class IngredientRequest(
    val materialPublicId: UUID,
    val quantity: Int,
)
