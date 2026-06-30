package org.napetrico.backend.features.orders.dto

import java.math.BigDecimal
import java.util.UUID

data class MovementResponse(
    val publicId: UUID,
    val productDescription: String?,
    val productPrice: BigDecimal?,
    val materialDescription: String?,
    val materialUnitPrice: BigDecimal?,
    val quantity: Int,
    val totalPrice: BigDecimal,
    val notes: String?,
)
