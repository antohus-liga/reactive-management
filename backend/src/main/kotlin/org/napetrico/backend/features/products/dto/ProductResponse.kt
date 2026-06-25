package org.napetrico.backend.features.products.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class ProductResponse(
    val publicId: UUID,
    val description: String,
    val quantity: Int,
    val categoryDescription: String,
    val categoryColor: String,
    val measurement: MeasurementType,
    val fixedPrice: BigDecimal? = null,
    val sellingMargin: BigDecimal? = null,
    val price: BigDecimal = fixedPrice ?: sellingMargin!!,
    val productionCost: BigDecimal,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)
