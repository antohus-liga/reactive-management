package org.napetrico.backend.features.users.dto

import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email

data class UpdateUserRequest(
    val companyName: String,
    val companyType: CompanyType,
    val taxId: String,
    val phoneNumber: String,
    val email: String,
    val country: String,
    val address: String,
)
