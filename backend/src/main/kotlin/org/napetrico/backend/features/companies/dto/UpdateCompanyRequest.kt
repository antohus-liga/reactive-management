package org.napetrico.backend.features.companies.dto

import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.CompanyType
import java.time.LocalDateTime

data class UpdateCompanyRequest(
    val companyName: String,
    val companyType: CompanyType,
    val roles: Set<CompanyRole>,
    val taxId: String,
    val phoneNumber: String,
    val email: String,
    val country: String,
    val address: String,
)
