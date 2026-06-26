package org.napetrico.backend.features.movements

import org.napetrico.backend.features.orders.Order
import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface MovementRepository : JpaRepository<Movement, Long> {
    fun findAllByOrder(order: Order): List<Movement>
    fun deleteByPublicIdAndUser(publicId: UUID, user: User)
    fun findByPublicIdAndUser(publicId: UUID, user: User): Movement?
}