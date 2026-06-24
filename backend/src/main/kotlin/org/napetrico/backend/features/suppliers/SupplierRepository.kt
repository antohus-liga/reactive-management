package org.napetrico.backend.features.suppliers

import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository

interface SupplierRepository : JpaRepository<Supplier, Long> {
    fun findAllByUser(user: User): List<Supplier>
    fun findByEmail(email: String): Supplier?
}