package org.napetrico.backend.features.clients

import org.napetrico.backend.features.clients.dto.ClientResponse
import org.springframework.stereotype.Service

@Service
class ClientService(
    private val repository: ClientRepository,
)
