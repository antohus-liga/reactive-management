package org.napetrico.backend.features.orders

import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.orders.dto.CreateOrderRequest
import org.napetrico.backend.features.orders.dto.MovementResponse
import org.napetrico.backend.features.orders.dto.OrderDetailsResponse
import org.napetrico.backend.features.orders.dto.OrderResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("api/orders")
class OrderController(
    private val orderService: OrderService
) {

    @GetMapping
    fun get(): ResponseEntity<List<OrderResponse>> =
        ResponseEntity.ok(orderService.getOrders())

    @PostMapping
    fun create(@RequestBody request: CreateOrderRequest): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.createOrder(request))

    @DeleteMapping("/{publicId}")
    fun delete(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        orderService.deleteOrder(publicId)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/{publicId}/movements")
    fun getOrderDetail(@PathVariable publicId: UUID): ResponseEntity<OrderDetailsResponse> =
        ResponseEntity.ok(orderService.getOrderDetails(publicId))

    @PostMapping("/{publicId}/movements")
    fun addMovement(
        @PathVariable publicId: UUID,
        @RequestBody request: CreateMovementRequest
    ): ResponseEntity<MovementResponse> =
        ResponseEntity.ok(orderService.addMovementToOrder(publicId, request))

    @DeleteMapping("/movements/{movementPublicId}")
    fun deleteMovement(
        @PathVariable movementPublicId: UUID
    ): ResponseEntity<Unit> =
        ResponseEntity.ok(orderService.deleteMovement(movementPublicId))

    @PostMapping("/{publicId}/complete")
    fun completeOrder(@PathVariable publicId: UUID): ResponseEntity<Unit> =
        ResponseEntity.ok(orderService.completeOrder(publicId))
}