package org.napetrico.backend.features.orders

import jakarta.transaction.Transactional
import org.napetrico.backend.common.exceptions.NegativeQuantityException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.exceptions.OrderHasNoMovementsException
import org.napetrico.backend.features.companies.CompanyService
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.movements.Movement
import org.napetrico.backend.features.movements.MovementService
import org.napetrico.backend.features.orders.OrderMapper.toEntity
import org.napetrico.backend.features.orders.OrderMapper.toResponse
import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.orders.dto.CreateOrderRequest
import org.napetrico.backend.features.orders.dto.MovementResponse
import org.napetrico.backend.features.orders.dto.OrderDetailsResponse
import org.napetrico.backend.features.orders.dto.OrderResponse
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.UUID

@Service
class OrderService(
    private val orderRepository: OrderRepository,
    private val userService: UserService,
    private val movementService: MovementService,
    private val companyService: CompanyService,
    private val productService: ProductService,
    private val materialService: MaterialService,
) {

    fun getOrders(): List<OrderResponse> {
        val user = userService.getCurrentUser()
        return orderRepository.findAllByUser(user).map { it.toResponse() }
    }

    fun createOrder(request: CreateOrderRequest): OrderResponse {
        val user = userService.getCurrentUser()
        val company = companyService.getCompany(request.companyPublicId, user)

        if (!company.roles.contains(request.withRole))
            throw IllegalArgumentException("This company does not have role ${request.withRole}.")

        return orderRepository.save(request.toEntity(company, user)).toResponse()
    }

    @Transactional
    fun deleteOrder(publicId: UUID) {
        val user = userService.getCurrentUser()
        val order = getOrder(publicId, user)

        val movements = order.movements
        if (!movements.isEmpty())
            movements.forEach {
                updateQuantity(it, -it.quantity)
                movementService.deleteMovement(it.publicId, user)
            }

        orderRepository.delete(order)
    }

    fun getOrderDetails(orderPublicId: UUID): OrderDetailsResponse {
        val user = userService.getCurrentUser()
        val order = getOrder(orderPublicId, user)
        val movements = movementService.getMovementsByOrder(order)

        return OrderDetailsResponse(
            movements = movements.toSet(),
            totalPrice = movements.fold(BigDecimal.ZERO) { acc, movement ->
                acc + movement.totalPrice
            },
        )
    }

    fun addMovementToOrder(orderPublicId: UUID, request: CreateMovementRequest): MovementResponse {
        val user = userService.getCurrentUser()
        val order = getOrder(orderPublicId, user)
        return movementService.createMovement(order, request, user)
    }

    @Transactional
    fun completeOrder(orderPublicId: UUID) {
        val user = userService.getCurrentUser()
        val order = getOrder(orderPublicId, user)

        val movements = order.movements
        if (movements.isEmpty()) throw OrderHasNoMovementsException()
        movements.forEach { updateQuantity(it, it.quantity) }

        order.also {
            it.isCompleted = true
            orderRepository.save(it)
        }
    }

    // Internal function, don't use in controllers
    fun getOrder(publicId: UUID, user: User): Order =
        orderRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Order")

    private fun updateQuantity(movement: Movement, delta: Int) {
        movement.product?.let { product ->
            val newQuantity = product.quantity - delta
            if (newQuantity < 0) throw NegativeQuantityException()
            productService.changeProductQuantity(product, newQuantity)
        }

        movement.material?.let { material ->
            val newQuantity = material.quantity + delta
            if (newQuantity < 0) throw NegativeQuantityException()
            materialService.changeMaterialQuantity(material, newQuantity)
        }
    }

}