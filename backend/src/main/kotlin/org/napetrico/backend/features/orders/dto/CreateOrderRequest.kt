package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.MovementType
import java.util.UUID

data class CreateOrderRequest(
    val companyPublicId: UUID,
    val withRole: CompanyRole,
    val type: MovementType,
)
