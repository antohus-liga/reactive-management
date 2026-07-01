package org.napetrico.backend.features.orders.dto

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.MovementType
import java.util.UUID

data class CreateOrderRequest(
    val companyPublicId: UUID,

    @field:NotEmpty
    var withRole: CompanyRole,
)
