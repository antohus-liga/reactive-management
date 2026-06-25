package org.napetrico.backend.features.products.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class CreateProductRequest(
    val description: String,
    val categoryPublicId: UUID,
    val measurement: MeasurementType,
    val fixedPrice: BigDecimal? = null,
    val sellingMargin: BigDecimal? = null,
) {
    init {
        validate()
    }

    fun validate() {
        if (!((fixedPrice != null) xor (sellingMargin != null)))
            throw IllegalArgumentException("Exactly one of fixedPrice or sellingMargin must be provided.")
    }
}
