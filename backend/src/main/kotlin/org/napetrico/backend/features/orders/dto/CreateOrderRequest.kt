package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.OrderType
import java.util.UUID

data class CreateOrderRequest(
    val companyPublicId: UUID,
    val type: OrderType,
)
