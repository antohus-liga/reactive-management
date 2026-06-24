package org.napetrico.backend.features.suppliers

import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.suppliers.SupplierMapper.applyUpdate
import org.napetrico.backend.features.suppliers.SupplierMapper.toEntity
import org.napetrico.backend.features.suppliers.SupplierMapper.toResponse
import org.napetrico.backend.features.suppliers.dto.CreateSupplierRequest
import org.napetrico.backend.features.suppliers.dto.SupplierResponse
import org.napetrico.backend.features.suppliers.dto.UpdateSupplierRequest
import org.napetrico.backend.features.users.UserService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class SupplierService(
    private val supplierRepository: SupplierRepository,
    private val userService: UserService
) {
    fun getAllByUser(): List<SupplierResponse> =
        supplierRepository.findAllByUser(
            userService.getCurrentUser()
        ).map { it.toResponse() }

    fun createSupplier(request: CreateSupplierRequest): SupplierResponse {
        if (supplierRepository.findByEmail(request.email.toString()) != null)
            throw AlreadyExistsException("Supplier with email ${request.email}")

        return supplierRepository.save(
            request.toEntity(userService.getCurrentUser())
        ).toResponse()
    }

    fun updateSupplier(id: Long, request: UpdateSupplierRequest): SupplierResponse {
        if (supplierRepository.findByEmail(request.email.toString()) != null)
            throw AlreadyExistsException("Supplier with email ${request.email}")

        return supplierRepository.save(
            supplierRepository.findByIdOrNull(id)?.applyUpdate(request)
                ?: throw NotFoundException("Supplier")
        ).toResponse()
    }

    fun deleteSupplier(id: Long) {
        supplierRepository.deleteById(id)
    }
}
