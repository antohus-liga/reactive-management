package org.napetrico.backend.features.orders.dto

import java.util.UUID

data class CreateMovementRequest(
    val orderPublicId: UUID,
    val productPublicId: UUID?,
    val materialPublicId: UUID?,
    val quantity: Int,
    val notes: String?,
)
