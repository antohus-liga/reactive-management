package org.napetrico.backend.features.companies

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
    fun create(@RequestBody request: CreateCompanyRequest): ResponseEntity<CompanyResponse> {
        return ResponseEntity.ok(companyService.createCompany(request))
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody request: UpdateCompanyRequest
    ): ResponseEntity<CompanyResponse> {
        return ResponseEntity.ok(companyService.updateCompany(id, request))
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Unit> {
        companyService.deleteCompany(id)
        return ResponseEntity.ok().build()
    }
}