package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.OrderType
import java.time.LocalDateTime
import java.util.UUID

data class OrderResponse(
    val publicId: UUID,
    val companyName: String,
    val companyCountry: String,
    val type: OrderType,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)