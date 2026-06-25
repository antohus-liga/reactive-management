package org.napetrico.backend.features.products.dto

import java.math.BigDecimal
import java.util.UUID

data class MaterialIngredientResponse(
    val materialPublicId: UUID,
    val materialDescription: String,
    val materialUnitPrice: BigDecimal,
    val quantityNeeded: Int,
)
