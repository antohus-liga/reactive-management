package org.napetrico.backend.unitTests

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.companies.CompanyRepository
import org.napetrico.backend.features.companies.CompanyService
import org.napetrico.backend.features.companies.dto.CreateCompanyRequest
import org.napetrico.backend.features.companies.dto.UpdateCompanyRequest
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import java.util.UUID
import kotlin.test.Test

class CompanyServiceTest {

    private val companyRepository = mockk<CompanyRepository>()
    private val userService = mockk<UserService>()
    private val companyService: CompanyService = CompanyService(companyRepository, userService)

    private val user = Fixtures.userFixture()

    private val createRequest = CreateCompanyRequest(
        companyName = "COMPANY NAME",
        companyType = CompanyType.LIMITED_LIABILITY_COMPANY,
        roles = setOf(CompanyRole.SUPPLIER),
        taxId = "",
        phoneNumber = "",
        email = "a@a.a",
        country = "",
        address = ""
    )

    private val updateRequest = UpdateCompanyRequest(
        companyName = "COMPANY NAME",
        companyType = CompanyType.LIMITED_LIABILITY_COMPANY,
        roles = setOf(CompanyRole.SUPPLIER),
        taxId = "",
        phoneNumber = "",
        email = "a@a.a",
        country = "",
        address = ""
    )

    // ===================
    // createCompany()
    // ===================
    @Test
    fun `creates company`() {
        every { userService.getCurrentUser() } returns user
        every { companyRepository.findByTaxId(createRequest.taxId) } returns null
        every { companyRepository.save(any()) } answers { firstArg() }

        val response = companyService.createCompany(createRequest)

        assertEquals(createRequest.taxId, response.taxId)
    }

    @Test
    fun `throws when company exists on create`() {
        val company = Fixtures.companyFixture()

        every { companyRepository.findByTaxId(createRequest.taxId) } returns company

        assertThrows<AlreadyExistsException> { companyService.createCompany(createRequest) }
    }

    // ===================
    // updateCompany()
    // ===================
    @Test
    fun `updates company with no matches`() {
        val company = Fixtures.companyFixture()

        every { userService.getCurrentUser() } returns user
        every { companyService.getCompany(any(), user) } returns company
        every { companyRepository.findByTaxId(createRequest.taxId) } returns null
        every { companyRepository.save(company) } answers { firstArg() }

        companyService.updateCompany(company.publicId, updateRequest)

        assertEquals(updateRequest.companyName, company.companyName)
    }

    @Test
    fun `updates company with a match`() {
        val company = Fixtures.companyFixture()

        every { userService.getCurrentUser() } returns user
        every { companyService.getCompany(any(), user) } returns company
        every { companyRepository.findByTaxId(createRequest.taxId) } returns company
        every { companyRepository.save(company) } answers { firstArg() }

        companyService.updateCompany(company.publicId, updateRequest)

        assertEquals(updateRequest.companyName, company.companyName)
    }

    @Test
    fun `throws when conflicts on update`() {
        val company = Fixtures.companyFixture()
        val conflict = Fixtures.companyFixture(id = 1)

        every { userService.getCurrentUser() } returns user
        every { companyService.getCompany(any(), user) } returns company
        every { companyRepository.findByTaxId(createRequest.taxId) } returns conflict

        assertThrows<AlreadyExistsException> { companyService.updateCompany(company.publicId, updateRequest) }
    }

    // ===================
    // getCompany()
    // ===================
    @Test
    fun `throws when company not found`() {
        every { companyRepository.findByPublicIdAndUser(any(), user) } returns null

        assertThrows<NotFoundException> { companyService.getCompany(UUID.randomUUID(), user) }
    }
}