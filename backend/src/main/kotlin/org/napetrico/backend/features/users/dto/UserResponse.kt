package org.napetrico.backend.features.users.dto

import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email
import java.time.LocalDateTime
import java.util.UUID

data class UserResponse(
    val publicId : UUID,
    val companyName: String,
    val companyType: CompanyType,
    val taxId: String,
    val phoneNumber: String,
    val email: Email,
    val country: String,
    val address: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
