package org.napetrico.backend.features.products.dto

import java.util.UUID

data class MaterialIngredientRequest(
    val materialPublicId: UUID,
    val quantity: Int,
)
