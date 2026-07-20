package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.CompanyRole
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class OrderResponse(
    val publicId: UUID,
    val companyName: String,
    val companyCountry: String,
    val withRole: CompanyRole,
    val isCompleted: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    val completedAt: LocalDateTime?,
    val debit: BigDecimal,
    val credit: BigDecimal,
)