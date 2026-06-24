package org.napetrico.backend.features.companies.dto

import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.CompanyType
import java.time.LocalDateTime
import java.util.UUID

data class CompanyResponse(
    val publicId: UUID,
    val companyName: String,
    val companyType: CompanyType,
    val roles: Set<CompanyRole>,
    val taxId: String,
    val phoneNumber: String,
    val email: String,
    val country: String,
    val address: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
