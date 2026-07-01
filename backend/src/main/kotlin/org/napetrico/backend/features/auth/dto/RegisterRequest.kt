package org.napetrico.backend.features.auth.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.CompanyType

data class RegisterRequest(
    @field:NotBlank(message = "Company name is required")
    @field:Size(min = 2, max = 100)
    val companyName: String,

    @field:NotNull(message = "Company type is required")
    var companyType: CompanyType,

    @field:NotBlank(message = "Tax ID is required")
    @field:Pattern(
        regexp = "^[A-Z0-9-]{5,20}$",
        message = "Tax ID must be alphanumeric (5-20 chars)"
    )
    val taxId: String,

    @field:NotBlank(message = "Phone number is required")
    @field:Pattern(
        regexp = "^\\+?[0-9]{7,15}$",
        message = "Phone number must be valid international format"
    )
    val phoneNumber: String,

    @field:NotBlank(message = "Email is required")
    @field:Size(max = 255)
    @Email(message = "Must be a valid email address")
    val email: String,

    @field:NotBlank(message = "Country is required")
    @field:Size(min = 2, max = 2, message = "Provide a country code (2 characters long), eg.: 'UK'")
    val country: String,

    @field:NotBlank(message = "Address is required")
    @field:Size(min = 5, max = 255)
    val address: String,

    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, max = 72)
    val password: String,
)
