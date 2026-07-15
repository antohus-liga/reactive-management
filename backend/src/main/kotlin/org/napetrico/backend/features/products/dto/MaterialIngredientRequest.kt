package org.napetrico.backend.features.products.dto

import jakarta.validation.constraints.Min
import java.util.UUID

data class MaterialIngredientRequest(
    val materialPublicId: UUID,

    @field:Min(value = 1, message = "validation.usedQuantity")
    val quantity: Int,
)
