package org.napetrico.backend.features.products

import jakarta.validation.Valid
import org.napetrico.backend.features.products.dto.CreateProductRequest
import org.napetrico.backend.features.products.dto.ProductRecipeRequest
import org.napetrico.backend.features.products.dto.ProductRecipeResponse
import org.napetrico.backend.features.products.dto.ProductResponse
import org.napetrico.backend.features.products.dto.UpdateProductRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/products")
class ProductController(
    val productService: ProductService
) {
    @GetMapping
    fun get(): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.getAllByUser())

    @PostMapping
    fun create(@Valid @RequestBody request: CreateProductRequest): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.createProduct(request))

    @PutMapping("/{publicId}")
    fun update(
        @PathVariable publicId: UUID,
        @Valid @RequestBody request: UpdateProductRequest
    ): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.updateProduct(publicId, request))

    @DeleteMapping("/{publicId}")
    fun delete(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        productService.deleteProduct(publicId)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/{publicId}/recipe")
    fun getRecipe(@PathVariable publicId: UUID): ResponseEntity<ProductRecipeResponse> =
        ResponseEntity.ok(productService.getProductRecipeDto(publicId))

    @PostMapping("/{publicId}/recipe")
    fun replaceRecipe(
        @PathVariable publicId: UUID,
        @Valid @RequestBody request: ProductRecipeRequest
    ): ResponseEntity<ProductRecipeResponse> =
        ResponseEntity.ok(productService.replaceRecipe(publicId, request))
}