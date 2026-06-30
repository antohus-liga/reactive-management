package org.napetrico.backend.features.productionOrders.dto

import org.napetrico.backend.common.enums.ProductionStatus
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class ProductionOrderResponse(
    val publicId: UUID,
    val productDescription: String,
    val productProductionCost: BigDecimal,
    val quantity: Int,
    val status: ProductionStatus,
    val totalCost: BigDecimal,
    val notes: String?,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
