package org.napetrico.backend.features.suppliers

import org.napetrico.backend.features.suppliers.dto.CreateSupplierRequest
import org.napetrico.backend.features.suppliers.dto.SupplierResponse
import org.napetrico.backend.features.suppliers.dto.UpdateSupplierRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/suppliers")
class SupplierController(
    private val supplierService: SupplierService,
) {

    @GetMapping
    fun get(): ResponseEntity<List<SupplierResponse>> {
        return ResponseEntity.ok(supplierService.getAllByUser())
    }

    @PostMapping
    fun create(@RequestBody request: CreateSupplierRequest): ResponseEntity<SupplierResponse> {
        return ResponseEntity.ok(supplierService.createSupplier(request))
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody request: UpdateSupplierRequest
    ): ResponseEntity<SupplierResponse> {
        return ResponseEntity.ok(supplierService.updateSupplier(id, request))
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Unit> {
        supplierService.deleteSupplier(id)
        return ResponseEntity.ok().build()
    }
}