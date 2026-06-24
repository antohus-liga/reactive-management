package org.napetrico.backend.features.companies

import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository

interface CompanyRepository : JpaRepository<Company, Long> {
    fun findAllByUser(user: User): List<Company>
    fun findByTaxIdAndCompanyRole(taxId: String, companyRole: CompanyRole): Company?
}