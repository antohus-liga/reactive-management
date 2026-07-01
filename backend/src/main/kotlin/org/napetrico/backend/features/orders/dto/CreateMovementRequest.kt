package org.napetrico.backend.features.orders.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.MovementType
import java.util.UUID

data class CreateMovementRequest(
    @field:NotNull
    var movementType: MovementType,

    val productPublicId: UUID?,
    val materialPublicId: UUID?,

    @field:Min(value = 1, message = "Quantity must be at least 1")
    val quantity: Int,

    @field:Size(max = 300)
    val notes: String?,
)
