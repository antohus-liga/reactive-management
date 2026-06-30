package org.napetrico.backend.features.orders.dto

import java.time.LocalDateTime
import java.util.UUID

data class OrderResponse(
    val publicId: UUID,
    val companyName: String,
    val companyCountry: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)