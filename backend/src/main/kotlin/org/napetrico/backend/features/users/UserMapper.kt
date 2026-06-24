package org.napetrico.backend.features.users

import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.users.dto.CreateUserRequest
import org.napetrico.backend.features.users.dto.UpdateUserRequest
import org.napetrico.backend.features.users.dto.UserResponse
import java.time.LocalDateTime
import java.util.UUID

object UserMapper {
    fun User.toResponse(): UserResponse = UserResponse(
        publicId = publicId,
        companyName = companyName,
        companyType = companyType,
        taxId = taxId,
        phoneNumber = phoneNumber,
        email = email.toString(),
        country = country,
        address = address,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateUserRequest.toEntity(): User = User(
        publicId = UUID.randomUUID(),
        password = password,
        companyName = companyName,
        companyType = companyType,
        taxId = taxId,
        phoneNumber = phoneNumber,
        email = Email(email),
        country = country,
        address = address,
        createdAt = LocalDateTime.now(),
        updatedAt = LocalDateTime.now(),
    )

    fun User.applyUpdate(update: UpdateUserRequest) {
        companyName = update.companyName
        companyType = update.companyType
        taxId = update.taxId
        phoneNumber = update.phoneNumber
        email = Email(update.email)
        country = update.country
        address = update.address
        updatedAt = LocalDateTime.now()
    }
}