package org.napetrico.backend.features.productionOrders

import jakarta.validation.Valid
import org.napetrico.backend.features.productionOrders.dto.CreateProductionOrderRequest
import org.napetrico.backend.features.productionOrders.dto.ProductionOrderResponse
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
@RequestMapping("/api/production-orders")
class ProductionOrderController(
    private val productionOrderService: ProductionOrderService,
) {
    @GetMapping
    fun get(): ResponseEntity<List<ProductionOrderResponse>> =
        ResponseEntity.ok(productionOrderService.getAll())

    @PostMapping
    fun create(@Valid @RequestBody request: CreateProductionOrderRequest): ResponseEntity<ProductionOrderResponse> =
        ResponseEntity.ok(productionOrderService.createProductionOrder(request))

    @DeleteMapping("/{publicId}")
    fun delete(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        productionOrderService.deleteProductionOrder(publicId)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/{publicId}")
    fun execute(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        productionOrderService.executeProductionOrder(publicId)
        return ResponseEntity.ok().build()
    }
}