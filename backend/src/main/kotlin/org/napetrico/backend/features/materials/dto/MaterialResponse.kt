package org.napetrico.backend.features.materials.dto

import org.napetrico.backend.common.enums.MeasurementType
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class MaterialResponse(
    val publicId: UUID,
    val description: String,
    val categoryDescription: String,
    val categoryColor: String,
    val measurement: MeasurementType,
    val unitPrice: BigDecimal,
    val quantity: Int,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)
