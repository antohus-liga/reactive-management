package org.napetrico.backend.features.categories

import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface CategoryRepository : JpaRepository<Category, Long> {
    fun findAllByUserOrderByCreatedAt(user: User): List<Category>
    fun findByNameAndUser(name: String, user: User): Category?
    fun findByPublicIdAndUser(publicId: UUID, user: User): Category?
    fun deleteByPublicIdAndUser(id: UUID, user: User)
    fun findByPublicId(publicId: UUID): Category?
}