package org.napetrico.backend.features.suppliers

import org.napetrico.backend.features.suppliers.dto.CreateSupplierRequest
import org.napetrico.backend.features.suppliers.dto.SupplierResponse
import org.napetrico.backend.features.suppliers.dto.UpdateSupplierRequest
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime

object SupplierMapper {
    fun Supplier.toResponse(): SupplierResponse = SupplierResponse(
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

    fun CreateSupplierRequest.toEntity(user: User): Supplier = Supplier(
        companyName = companyName,
        companyType = companyType,
        taxId = taxId,
        phoneNumber = phoneNumber,
        email = email,
        country = country,
        address = address,
        createdAt = LocalDateTime.now(),
        updatedAt = LocalDateTime.now(),
        user = user,
    )

    fun Supplier.applyUpdate(update: UpdateSupplierRequest): Supplier {
        update.companyName?.let { companyName = it }
        update.companyType?.let { companyType = it }
        update.taxId?.let { taxId = it }
        update.phoneNumber?.let { phoneNumber = it }
        update.email?.let { email = it }
        update.country?.let { country = it }
        update.address?.let { address = it }
        updatedAt = LocalDateTime.now()

        return this
    }
}