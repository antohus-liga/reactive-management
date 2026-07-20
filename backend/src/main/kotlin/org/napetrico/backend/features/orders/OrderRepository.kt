package org.napetrico.backend.features.orders

import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface OrderRepository : JpaRepository<Order, Long> {
    fun findAllByUserOrderByCreatedAtDesc(user: User): List<Order>
    fun findByPublicIdAndUser(publicId: UUID, user: User): Order?
}