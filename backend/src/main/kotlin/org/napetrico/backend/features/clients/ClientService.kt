package org.napetrico.backend.features.clients

import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.clients.ClientMapper.applyUpdate
import org.napetrico.backend.features.clients.ClientMapper.toEntity
import org.napetrico.backend.features.clients.ClientMapper.toResponse
import org.napetrico.backend.features.clients.dto.ClientResponse
import org.napetrico.backend.features.clients.dto.CreateClientRequest
import org.napetrico.backend.features.clients.dto.UpdateClientRequest
import org.napetrico.backend.features.users.UserService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ClientService(
    private val clientRepository: ClientRepository,
    private val userService: UserService
) {
    fun getAllByUser(): List<ClientResponse> =
        clientRepository.findAllByUser(
            userService.getCurrentUser()
        ).map { it.toResponse() }

    fun createClient(request: CreateClientRequest): ClientResponse {
        return clientRepository.save(
            request.toEntity(userService.getCurrentUser())
        ).toResponse()
    }

    fun updateClient(id: Long, request: UpdateClientRequest): ClientResponse {
        return clientRepository.save(
            clientRepository.findByIdOrNull(id)?.applyUpdate(request)
                ?: throw NotFoundException("Client")
        ).toResponse()
    }

    fun deleteClient(id: Long) {
        clientRepository.deleteById(id)
    }
}
