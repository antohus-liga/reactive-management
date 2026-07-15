package org.napetrico.backend.features.productionOrders.dto

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Size
import java.util.UUID

data class CreateProductionOrderRequest(
    val productPublicId: UUID,

    @field:Min(value = 1, message = "validation.usedQuantity")
    val quantity: Int,

    @field:Size(max = 300)
    val notes: String?,
)
