package org.napetrico.backend.features.products.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class CreateProductRequest(
    override val description: String,
    override val categoryPublicId: UUID,
    override val measurement: MeasurementType,
    override val fixedPrice: BigDecimal? = null,
    override val sellingMargin: String? = null,
) : ProductRequest(
    description = description,
    categoryPublicId = categoryPublicId,
    measurement = measurement,
    fixedPrice = fixedPrice,
    sellingMargin = sellingMargin,
)
