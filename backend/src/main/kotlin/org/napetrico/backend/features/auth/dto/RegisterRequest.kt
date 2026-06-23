package org.napetrico.backend.features.auth.dto

import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email

data class RegisterRequest(
    val companyName: String,
    val companyType: CompanyType,
    val taxId: String,
    val phoneNumber: String,
    val email: Email,
    val country: String,
    val address: String,
    val password: String,
)
