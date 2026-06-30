package org.napetrico.backend.features.productionOrders.dto

import java.util.UUID

data class CreateProductionOrderRequest(
    val productPublicId: UUID,
    val quantity: Int,
    val notes: String?,
)
