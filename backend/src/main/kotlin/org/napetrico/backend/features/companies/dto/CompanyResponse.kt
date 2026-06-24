package org.napetrico.backend.features.companies.dto

import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.CompanyType
import java.time.LocalDateTime

data class CompanyResponse(
    val companyName: String,
    val companyType: CompanyType,
    val companyRole: CompanyRole,
    val taxId: String,
    val phoneNumber: String,
    val email: String,
    val country: String,
    val address: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
