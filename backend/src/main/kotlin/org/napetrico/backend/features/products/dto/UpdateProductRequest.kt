package org.napetrico.backend.features.products.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class UpdateProductRequest(

    @field:Size(max = 90)
    override val description: String,
    override val categoryPublicId: UUID,
    override val measurement: MeasurementType,

    @field:Min(value = 0, message = "Fixed price cannot be negative.")
    override val fixedPrice: BigDecimal? = null,

    @field:Pattern(regexp = "^\\d+(\\.\\d+)?%$", message = "Fixed price cannot be negative.")
    override val sellingMargin: String? = null,

    @field:Min(value = 0, message = "Quantity cannot be negative.")
    val quantity: Int,
) : ProductRequest(
    description = description,
    categoryPublicId = categoryPublicId,
    measurement = measurement,
    fixedPrice = fixedPrice,
    sellingMargin = sellingMargin,
)