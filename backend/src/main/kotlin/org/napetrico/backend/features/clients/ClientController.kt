package org.napetrico.backend.features.clients

import org.napetrico.backend.features.clients.dto.ClientResponse
import org.napetrico.backend.features.clients.dto.CreateClientRequest
import org.napetrico.backend.features.clients.dto.UpdateClientRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/clients")
class ClientController(
    private val clientService: ClientService,
) {

    @GetMapping
    fun get(): ResponseEntity<List<ClientResponse>> {
        return ResponseEntity.ok(clientService.getAllByUser())
    }

    @PostMapping
    fun create(@RequestBody request: CreateClientRequest): ResponseEntity<ClientResponse> {
        return ResponseEntity.ok(clientService.createClient(request))
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody request: UpdateClientRequest
    ): ResponseEntity<ClientResponse> {
        return ResponseEntity.ok(clientService.updateClient(id, request))
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Unit> {
        clientService.deleteClient(id)
        return ResponseEntity.ok().build()
    }
}