package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.values.Price

data class MovementResponse(
    val productDescription: String?,
    val productPrice: Price?,
    val materialDescription: String?,
    val materialUnitPrice: Price?,
    val quantity: Int,
    val totalPrice: Price,
    val notes: String?,
)
