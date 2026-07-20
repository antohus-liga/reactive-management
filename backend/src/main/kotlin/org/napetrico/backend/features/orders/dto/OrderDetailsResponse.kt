package org.napetrico.backend.features.orders.dto

import java.math.BigDecimal

data class OrderDetailsResponse(
    val movements: Set<MovementResponse>,
    val debit: BigDecimal,
    val credit: BigDecimal,
)

