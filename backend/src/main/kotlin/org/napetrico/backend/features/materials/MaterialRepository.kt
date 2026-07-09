package org.napetrico.backend.features.materials

import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface MaterialRepository : JpaRepository<Material, Long> {
    fun findAllByUserOrderByCreatedAt(user: User): List<Material>
    fun findByPublicIdAndUser(id: UUID, user: User): Material?
    fun deleteByPublicIdAndUser(id: UUID, user: User)
    fun findByDescriptionAndUser(description: String, user: User): Material?
}