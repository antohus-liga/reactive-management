package org.napetrico.backend.features.products.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

open class ProductRequest(
    open val description: String,
    open val categoryPublicId: UUID,
    open val measurement: MeasurementType,
    open val fixedPrice: BigDecimal? = null,
    open val sellingMargin: String? = null,
)
