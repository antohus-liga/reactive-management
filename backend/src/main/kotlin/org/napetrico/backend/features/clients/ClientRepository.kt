package org.napetrico.backend.features.clients

import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository

interface ClientRepository : JpaRepository<Client, Long> {
    fun findAllByUser(user: User): List<Client>
    fun findByEmail(email: String): Client?
}