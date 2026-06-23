package org.napetrico.backend.features.users

import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository : JpaRepository<User, Long> {
    fun findByPublicId(publicId: UUID): User?
    fun findByEmail(email: String): User?
}