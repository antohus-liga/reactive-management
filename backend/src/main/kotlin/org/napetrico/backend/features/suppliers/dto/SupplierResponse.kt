package org.napetrico.backend.features.suppliers.dto

import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.values.Email
import java.time.LocalDateTime

data class SupplierResponse(
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
