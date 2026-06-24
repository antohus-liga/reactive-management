package org.napetrico.backend.features.companies

import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.companies.CompanyMapper.applyUpdate
import org.napetrico.backend.features.companies.CompanyMapper.toEntity
import org.napetrico.backend.features.companies.CompanyMapper.toResponse
import org.napetrico.backend.features.companies.dto.CompanyResponse
import org.napetrico.backend.features.companies.dto.CreateCompanyRequest
import org.napetrico.backend.features.companies.dto.UpdateCompanyRequest
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class CompanyService(
    private val companyRepository: CompanyRepository,
    private val userService: UserService
) {
    fun getAllByUser(): List<CompanyResponse> =
        companyRepository.findAllByUser(
            userService.getCurrentUser()
        ).map { it.toResponse() }

    fun createCompany(request: CreateCompanyRequest): CompanyResponse {
        val company = companyRepository.findByTaxId(request.taxId)
        if (company != null)
            throw AlreadyExistsException("Company with tax id '${request.taxId}'")

        return companyRepository.save(
            request.toEntity(userService.getCurrentUser())
        ).toResponse()
    }

    fun updateCompany(publicId: UUID, request: UpdateCompanyRequest): CompanyResponse {
        val company = companyRepository.findByPublicIdAndUser(publicId, userService.getCurrentUser())
            ?: throw NotFoundException("Company with public id '${publicId}'")

        val conflict = companyRepository.findByTaxId(request.taxId)

        if (conflict != null && company.id != conflict.id)
            throw AlreadyExistsException("Company with tax id '${request.taxId}'")

        return companyRepository.save(company.applyUpdate(request)).toResponse()
    }

    @Transactional
    fun deleteCompany(publicId: UUID) =
        companyRepository.deleteByPublicIdAndUser(publicId, userService.getCurrentUser())
}
