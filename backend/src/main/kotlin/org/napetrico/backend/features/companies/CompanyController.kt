package org.napetrico.backend.features.companies

import jakarta.validation.Valid
import org.napetrico.backend.features.companies.dto.CompanyResponse
import org.napetrico.backend.features.companies.dto.CreateCompanyRequest
import org.napetrico.backend.features.companies.dto.UpdateCompanyRequest
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
@RequestMapping("/api/companies")
class CompanyController(
    private val companyService: CompanyService,
) {

    @GetMapping
    fun get(): ResponseEntity<List<CompanyResponse>> {
        return ResponseEntity.ok(companyService.getAllByUser())
    }

    @PostMapping
    fun create(@Valid @RequestBody request: CreateCompanyRequest): ResponseEntity<CompanyResponse> {
        return ResponseEntity.ok(companyService.createCompany(request))
    }

    @PutMapping("/{publicId}")
    fun update(
        @PathVariable publicId: UUID,
        @Valid @RequestBody request: UpdateCompanyRequest
    ): ResponseEntity<CompanyResponse> {
        return ResponseEntity.ok(companyService.updateCompany(publicId, request))
    }

    @DeleteMapping("/{publicId}")
    fun delete(@PathVariable publicId: UUID): ResponseEntity<Unit> {
        companyService.deleteCompany(publicId)
        return ResponseEntity.ok().build()
    }
}