package org.napetrico.backend.features.products.dto

import java.math.BigDecimal
import java.util.UUID

data class CreateProductRequest(
    val description: String,
    val categoryPublicId: UUID,
    val measurement: String,
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
