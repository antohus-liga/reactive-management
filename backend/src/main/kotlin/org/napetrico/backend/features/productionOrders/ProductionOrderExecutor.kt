package org.napetrico.backend.features.productionOrders

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class ProductionOrderExecutor(
    private val productionOrderRepository: ProductionOrderRepository,
    private val userService: UserService,
    private val productService: ProductService,
    private val materialService: MaterialService,
) {
    @Transactional
    fun failProductionOrder(publicId: UUID, userPublicId: UUID) {
        println("FAILING ORDER")
        val user = userService.getUser(userPublicId)
            ?: throw NotFoundException("User")
        val productionOrder = getProductionOrder(publicId, user)
        productionOrder.status = ProductionStatus.FAILED
    }

    @Transactional
    fun completeProductionOrder(publicId: UUID, userPublicId: UUID) {
        println("COMPLETING ORDER")
        val user = userService.getUser(userPublicId)
            ?: throw NotFoundException("User")
        val productionOrder = getProductionOrder(publicId, user)

        val recipe = productService.getProductRecipe(productionOrder.product, user)

        materialService.consumeMaterials(
            recipe,
            productionOrder.quantity
        )

        productionOrder.product.quantity += productionOrder.quantity

        productionOrder.status = ProductionStatus.COMPLETED
    }

    // Internal function, don't use in controllers
    fun getProductionOrder(publicId: UUID, user: User): ProductionOrder =
        productionOrderRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Production order")
}