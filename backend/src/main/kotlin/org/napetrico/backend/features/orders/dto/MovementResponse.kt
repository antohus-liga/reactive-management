package org.napetrico.backend.features.orders.dto

import java.math.BigDecimal

data class MovementResponse(
    val productDescription: String?,
    val productPrice: BigDecimal?,
    val materialDescription: String?,
    val materialUnitPrice: BigDecimal?,
    val quantity: Int,
    val totalPrice: BigDecimal,
    val notes: String?,
)
