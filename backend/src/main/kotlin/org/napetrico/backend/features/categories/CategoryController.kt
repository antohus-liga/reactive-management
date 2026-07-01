package org.napetrico.backend.features.categories

import jakarta.validation.Valid
import org.napetrico.backend.features.categories.dto.CategoryResponse
import org.napetrico.backend.features.categories.dto.CreateCategoryRequest
import org.napetrico.backend.features.categories.dto.UpdateCategoryRequest
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
@RequestMapping("/api/categories")
class CategoryController(
    private val categoryService: CategoryService,
) {
    @GetMapping
    fun get(): ResponseEntity<List<CategoryResponse>> =
        ResponseEntity.ok(categoryService.getAllByUser())

    @PostMapping
    fun create(@Valid @RequestBody request: CreateCategoryRequest): ResponseEntity<CategoryResponse> =
        ResponseEntity.ok(categoryService.createCategory(request))

    @PutMapping("/{publicId}")
    fun update(
        @PathVariable publicId: UUID,
        @Valid @RequestBody request: UpdateCategoryRequest
    ): ResponseEntity<CategoryResponse> = ResponseEntity.ok(categoryService.updateCategory(publicId, request))

    @DeleteMapping("/{publicId}")
    fun delete(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        categoryService.deleteCategory(publicId)
        return ResponseEntity.ok().build()
    }
}