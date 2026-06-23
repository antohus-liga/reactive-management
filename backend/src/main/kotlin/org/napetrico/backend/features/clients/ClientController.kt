package org.napetrico.backend.features.clients

import org.napetrico.backend.features.clients.dto.ClientResponse
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = ["http://localhost:5173"])
class ClientController(
    private val clientService: ClientService,
) {

    @GetMapping
    fun get(): List<ClientResponse> {}
}