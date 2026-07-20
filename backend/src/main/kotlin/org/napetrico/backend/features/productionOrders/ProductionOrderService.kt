package org.napetrico.backend.features.productionOrders

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.common.exceptions.CannotDeleteProductionOrderException
import org.napetrico.backend.common.exceptions.InsufficientQuantityException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.productionOrders.ProductionOrderMapper.toEntity
import org.napetrico.backend.features.productionOrders.ProductionOrderMapper.toResponse
import org.napetrico.backend.features.productionOrders.dto.CreateProductionOrderRequest
import org.napetrico.backend.features.productionOrders.dto.ProductionOrderResponse
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.scheduling.TaskScheduler
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class ProductionOrderService(
    private val productionOrderRepository: ProductionOrderRepository,
    private val userService: UserService,
    private val productService: ProductService,
    @Qualifier("productionTaskScheduler")
    private val taskScheduler: TaskScheduler,
    private val productionOrderExecutor: ProductionOrderExecutor,
) {
    fun getAll(): List<ProductionOrderResponse> =
        productionOrderRepository.findAllByUserOrderByCreatedAtDesc(userService.getCurrentUser()).map { it.toResponse() }

    fun createProductionOrder(request: CreateProductionOrderRequest): ProductionOrderResponse {
        val user = userService.getCurrentUser()
        val product = productService.getProduct(request.productPublicId, user)

        return productionOrderRepository.save(request.toEntity(product, user)).toResponse()
    }

    fun deleteProductionOrder(publicId: UUID) {
        val productionOrder = getProductionOrder(publicId, userService.getCurrentUser())
        if (
            productionOrder.status == ProductionStatus.IN_PROGRESS
            || productionOrder.status == ProductionStatus.COMPLETED
        )
            throw CannotDeleteProductionOrderException()

        productionOrderRepository.delete(productionOrder)
    }

    @Transactional
    fun executeProductionOrder(publicId: UUID) {
        val user = userService.getCurrentUser()

        val productionOrder = getProductionOrder(publicId, user)

        if (productionOrder.status != ProductionStatus.PENDING)
            throw IllegalStateException("Production order is already being processed.")

        productionOrder.status = ProductionStatus.IN_PROGRESS
        productionOrderRepository.save(productionOrder)

        taskScheduler.schedule({
            try {
                productionOrderExecutor.completeProductionOrder(publicId, user.publicId)
            } catch (_: InsufficientQuantityException) {
                productionOrderExecutor.failProductionOrder(publicId, user.publicId)
            }
        }, Instant.now().plusSeconds(3))
    }

    // Internal function, don't use in controllers
    fun getProductionOrder(publicId: UUID, user: User): ProductionOrder =
        productionOrderRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Production order")
}