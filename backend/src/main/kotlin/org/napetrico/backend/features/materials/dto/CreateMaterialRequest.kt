package org.napetrico.backend.features.materials.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class CreateMaterialRequest(

    @field:Size(max = 90)
    override val description: String,

    override val categoryPublicId: UUID,
    override val measurement: MeasurementType,

    @field:Min(value = 0, message = "Unit price cannot be negative.")
    override val unitPrice: BigDecimal
) : MaterialRequest(
    description,
    categoryPublicId,
    measurement,
    unitPrice,
)