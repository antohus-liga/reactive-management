package org.napetrico.backend.features.productionOrders

import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ProductionOrderRepository : JpaRepository<ProductionOrder, Long> {
    fun findByPublicIdAndUser(publicId: UUID, user: User): ProductionOrder?
    fun findByProductAndStatusAndUser(product: Product, status: ProductionStatus, user: User): ProductionOrder?
    fun findAllByUser(user: User): List<ProductionOrder>
}