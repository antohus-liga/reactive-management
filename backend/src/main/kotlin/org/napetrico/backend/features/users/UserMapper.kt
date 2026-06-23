package org.napetrico.backend.features.users

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
        email = email,
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
        email = email,
        country = country,
        address = address,
        createdAt = LocalDateTime.now(),
        updatedAt = LocalDateTime.now(),
    )

    fun User.applyUpdate(update: UpdateUserRequest) {
        update.companyName?.let { companyName = it }
        update.companyType?.let { companyType = it }
        update.taxId?.let { taxId = it }
        update.phoneNumber?.let { phoneNumber = it }
        update.email?.let { email = it }
        update.country?.let { country = it }
        update.address?.let { address = it }
        updatedAt = LocalDateTime.now()
    }
}