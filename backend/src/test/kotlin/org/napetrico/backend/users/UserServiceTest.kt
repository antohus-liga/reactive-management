package org.napetrico.backend.users

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.users.UserRepository
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.features.users.dto.CreateUserRequest
import org.napetrico.backend.helper.Auth
import org.napetrico.backend.helper.Fixtures
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import kotlin.test.Test
import kotlin.test.assertEquals

class UserServiceTest {
    private val userRepository = mockk<UserRepository>()
    private val userService = UserService(userRepository)

    val createRequest = CreateUserRequest(
        companyName = "",
        companyType = CompanyType.LIMITED_LIABILITY_COMPANY,
        taxId = "",
        phoneNumber = "",
        email = "a@a.a",
        country = "",
        address = "",
        password = ""
    )

    // =========================
    // getCurrentUser()
    // =========================
    @Test
    fun `throws no auth internal`() {
        assertThrows<NotFoundException> { userService.getCurrentUser() }
    }

    @Test
    fun `throws not found internal`() {
        val email = "a@a.a"

        Auth.setAuth(email)

        every { userRepository.findByEmail(email) } returns null

        assertThrows<NotFoundException> { userService.getCurrentUser() }
    }

    @Test
    fun `gets current user internal`() {
        val email = "a@a.a"
        val user = Fixtures.userFixture()

        Auth.setAuth(email)

        every { userRepository.findByEmail(email) } returns user

        val result = userService.getCurrentUser()

        assertEquals(user, result)
    }

    // =========================
    // getCurrentUserResponse()
    // =========================
    @Test
    fun `throws no auth on response`() {
        assertThrows<NotFoundException> { userService.getCurrentUserResponse() }
    }

    @Test
    fun `throws not found on response`() {
        val email = "a@a.a"

        Auth.setAuth(email)

        every { userRepository.findByEmail(email) } returns null

        assertThrows<NotFoundException> { userService.getCurrentUserResponse() }
    }

    @Test
    fun `gets current user response`() {
        val email = "a@a.a"
        val user = Fixtures.userFixture(email = email)

        Auth.setAuth(email)

        every { userRepository.findByEmail(email) } returns user

        val response = userService.getCurrentUserResponse()

        assertEquals(user.email.value, response.email)
    }

    @AfterEach
    fun tearDown() = SecurityContextHolder.clearContext()
}