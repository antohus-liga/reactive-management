package org.napetrico.backend.features.productionOrders

import org.napetrico.backend.common.enums.ProductionStatus
import org.napetrico.backend.features.productionOrders.dto.CreateProductionOrderRequest
import org.napetrico.backend.features.productionOrders.dto.ProductionOrderResponse
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import java.math.BigDecimal

object ProductionOrderMapper {
    fun ProductionOrder.toResponse(productionCost: BigDecimal): ProductionOrderResponse = ProductionOrderResponse(
        publicId = publicId,
        productDescription = product.description,
        productProductionCost = productionCost,
        quantity = quantity,
        status = status,
        totalCost = productionCost.multiply(BigDecimal(quantity)),
        notes = notes,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateProductionOrderRequest.toEntity(product: Product, user: User): ProductionOrder = ProductionOrder(
        user = user,
        product = product,
        status = ProductionStatus.PENDING,
        quantity = quantity,
        notes = notes,
    )
}