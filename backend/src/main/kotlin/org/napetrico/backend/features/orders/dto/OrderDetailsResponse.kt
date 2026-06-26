package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.OrderType
import org.napetrico.backend.common.values.Price
import java.util.UUID

data class OrderDetailsResponse(
    val movements: Set<MovementResponse>,
    val totalPrice: Price,
)
