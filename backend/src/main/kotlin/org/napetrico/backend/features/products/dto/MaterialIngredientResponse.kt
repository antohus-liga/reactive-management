package org.napetrico.backend.features.products.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class MaterialIngredientResponse(
    val materialPublicId: UUID,
    val materialDescription: String,
    val materialUnitPrice: BigDecimal,
    val materialMeasurement: MeasurementType,
    val quantityNeeded: Int,
)
