package org.napetrico.backend.features.companies

import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.features.users.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface CompanyRepository : JpaRepository<Company, Long> {
    fun findAllByUser(user: User): List<Company>
    fun findByTaxId(taxId: String): Company?
    fun findByPublicIdAndUser(publicId: UUID, user: User): Company?
    fun deleteByPublicIdAndUser(publicId: UUID, user: User)
}