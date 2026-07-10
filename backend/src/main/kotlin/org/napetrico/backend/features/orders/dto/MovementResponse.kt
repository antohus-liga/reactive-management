package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.MovementType
import org.napetrico.backend.common.values.Discount
import java.math.BigDecimal
import java.util.UUID

data class MovementResponse(
    val publicId: UUID,
    val movementType: MovementType,
    val productDescription: String?,
    val productPrice: BigDecimal?,
    val materialDescription: String?,
    val materialUnitPrice: BigDecimal?,
    val discount: String?,
    val quantity: Int,
    val totalPrice: BigDecimal,
    val notes: String?,
)
