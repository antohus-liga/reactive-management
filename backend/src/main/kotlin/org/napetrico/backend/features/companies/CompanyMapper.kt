package org.napetrico.backend.features.companies

import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.companies.dto.CompanyResponse
import org.napetrico.backend.features.companies.dto.CreateCompanyRequest
import org.napetrico.backend.features.companies.dto.UpdateCompanyRequest
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime

object CompanyMapper {
    fun Company.toResponse(): CompanyResponse = CompanyResponse(
        companyName = companyName,
        companyType = companyType,
        companyRole = companyRole,
        taxId = taxId,
        phoneNumber = phoneNumber,
        email = email.toString(),
        country = country,
        address = address,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateCompanyRequest.toEntity(user: User): Company = Company(
        companyName = companyName,
        companyType = companyType,
        companyRole = companyRole,
        taxId = taxId,
        phoneNumber = phoneNumber,
        email = Email(email),
        country = country,
        address = address,
        createdAt = LocalDateTime.now(),
        updatedAt = LocalDateTime.now(),
        user = user,
    )

    fun Company.applyUpdate(update: UpdateCompanyRequest): Company {
        companyName = update.companyName
        companyType = update.companyType
        companyRole = update.companyRole
        taxId = update.taxId
        phoneNumber = update.phoneNumber
        email = Email(update.email)
        country = update.country
        address = update.address
        updatedAt = LocalDateTime.now()

        return this
    }
}