package org.napetrico.backend.features.products.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.util.UUID

data class UpdateProductRequest(
    val description: String,
    val quantity: Int,
    val categoryPublicId: UUID,
    val measurement: MeasurementType,
    val fixedPrice: BigDecimal? = null,
    val sellingMargin: BigDecimal? = null,
) {
    init {
        validate()
    }

    fun validate() {
        if ((fixedPrice != null) xor (sellingMargin != null))
            throw IllegalArgumentException("Only fixed price or selling margin is supported. Can't fill both.")
    }
}