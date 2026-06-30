package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.MovementType
import java.util.UUID

data class CreateMovementRequest(
    val movementType: MovementType,
    val productPublicId: UUID?,
    val materialPublicId: UUID?,
    val quantity: Int,
    val notes: String?,
)
