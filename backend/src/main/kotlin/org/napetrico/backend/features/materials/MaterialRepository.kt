package org.napetrico.backend.features.materials

import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.math.BigDecimal
import java.util.UUID

interface MaterialRepository : JpaRepository<Material, Long> {
    fun findAllByUser(user: User): List<Material>
    fun findByPublicIdAndUser(id: UUID, user: User): Material?
    fun deleteByPublicIdAndUser(id: UUID, user: User)
    fun findByDescriptionAndUnitPriceAndUser(
        description: String,
        unitPrice: BigDecimal?,
        user: User,
    ): Material?
}