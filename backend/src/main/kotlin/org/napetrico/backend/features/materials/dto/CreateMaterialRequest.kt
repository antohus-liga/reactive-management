package org.napetrico.backend.features.materials.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class CreateMaterialRequest(
    override val description: String,
    override val categoryPublicId: UUID,
    override val measurement: MeasurementType,
    override val unitPrice: BigDecimal
) : MaterialRequest(
    description,
    categoryPublicId,
    measurement,
    unitPrice,
)