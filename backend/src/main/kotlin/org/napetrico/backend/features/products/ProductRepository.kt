package org.napetrico.backend.features.products

import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.math.BigDecimal
import java.util.UUID

interface ProductRepository : JpaRepository<Product, Long> {
    fun findAllByUser(user: User): List<Product>
    fun findByPublicIdAndUser(id: UUID, user: User): Product?
    fun deleteByPublicIdAndUser(id: UUID, user: User)
    fun findByDescriptionAndFixedPriceAndSellingMarginAndUser(
        description: String,
        fixedPrice: BigDecimal?,
        sellingMargin: BigDecimal?,
        user: User,
    ): Product?
}