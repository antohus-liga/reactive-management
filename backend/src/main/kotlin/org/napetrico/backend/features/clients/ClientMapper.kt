package org.napetrico.backend.features.clients

import org.napetrico.backend.features.clients.dto.ClientResponse
import org.napetrico.backend.features.clients.dto.CreateClientRequest
import org.napetrico.backend.features.clients.dto.UpdateClientRequest
import java.time.LocalDateTime

object ClientMapper {
    fun Client.toResponse(): ClientResponse = ClientResponse(
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

    fun CreateClientRequest.toEntity(): Client = Client(
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

    fun Client.applyUpdate(update: UpdateClientRequest) {
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