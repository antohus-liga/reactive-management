package org.napetrico.backend.features.orders.dto

import org.napetrico.backend.common.enums.CompanyRole
import java.util.UUID

data class CreateOrderRequest(
    val companyPublicId: UUID,
    var withRole: CompanyRole,
)
