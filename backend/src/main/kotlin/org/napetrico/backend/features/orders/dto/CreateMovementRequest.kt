package org.napetrico.backend.features.orders.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.MovementType
import org.napetrico.backend.common.values.Discount
import java.util.UUID

data class CreateMovementRequest(
    @field:NotNull
    var movementType: MovementType,

    val productPublicId: UUID?,
    val materialPublicId: UUID?,

    @Pattern(
        regexp = "^(?:0\\.\\d*[1-9]\\d*|[1-9]\\d*(?:\\.\\d+)?)%(?:\\+(?:0\\.\\d*[1-9]\\d*|[1-9]\\d*(?:\\.\\d+)?)%)*$",
        message = "Discounts have to follow this format: eg. 2%+1.5%"
    )
    val discount: String?,

    @field:Min(value = 1, message = "Quantity must be at least 1")
    val quantity: Int,

    @field:Size(max = 300)
    val notes: String?,
)
