package org.napetrico.backend.features.materials.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.*

data class UpdateMaterialRequest(

    @field:Size(max = 90, message = "validation.description")
    override val description: String,

    override val categoryPublicId: UUID,
    override val measurement: MeasurementType,

    @field:DecimalMin(
        value = "0.01",
        inclusive = true,
        message = "validation.price"
    )
    override val unitPrice: BigDecimal,

    @field:Min(value = 0, message = "validation.stockQuantity")
    val quantity: Int,
) : MaterialRequest(
    description,
    categoryPublicId,
    measurement,
    unitPrice,
)
