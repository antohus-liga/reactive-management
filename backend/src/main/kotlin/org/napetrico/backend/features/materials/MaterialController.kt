package org.napetrico.backend.features.materials

import jakarta.validation.Valid
import org.napetrico.backend.features.materials.dto.CreateMaterialRequest
import org.napetrico.backend.features.materials.dto.MaterialResponse
import org.napetrico.backend.features.materials.dto.UpdateMaterialRequest
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
@RequestMapping("/api/materials")
class MaterialController(
    private val materialService: MaterialService
) {

    @GetMapping
    fun get(): ResponseEntity<List<MaterialResponse>> {
        return ResponseEntity.ok(materialService.getAllByUser())
    }

    @PostMapping
    fun create(@Valid @RequestBody request: CreateMaterialRequest): ResponseEntity<MaterialResponse> {
        return ResponseEntity.ok(materialService.createMaterial(request))
    }

    @PutMapping("/{publicId}")
    fun update(
        @PathVariable publicId: UUID,
        @Valid @RequestBody request: UpdateMaterialRequest
    ): ResponseEntity<MaterialResponse> {
        return ResponseEntity.ok(materialService.updateMaterial(publicId, request))
    }

    @DeleteMapping("/{publicId}")
    fun delete(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        materialService.deleteMaterial(publicId)
        return ResponseEntity.ok().build()
    }
}