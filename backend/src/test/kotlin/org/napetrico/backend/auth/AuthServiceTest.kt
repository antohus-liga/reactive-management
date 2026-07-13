package org.napetrico.backend.auth

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CompanyType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.InvalidCredentialsException
import org.napetrico.backend.common.exceptions.InvalidTokenException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.auth.AuthService
import org.napetrico.backend.features.auth.JwtService
import org.napetrico.backend.features.auth.dto.LoginRequest
import org.napetrico.backend.features.auth.dto.RefreshRequest
import org.napetrico.backend.features.auth.dto.RegisterRequest
import org.napetrico.backend.features.users.UserMapper.toResponse
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.crypto.password.PasswordEncoder
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals

class AuthServiceTest {

    private val userService = mockk<UserService>()
    private val passwordEncoder = mockk<PasswordEncoder>()
    private val jwtService = mockk<JwtService>()
    private val authenticationManager = mockk<AuthenticationManager>()

    private val authService = AuthService(
        userService,
        passwordEncoder,
        jwtService,
        authenticationManager
    )

    private val registerRequest = RegisterRequest(
        email = "test@test.com",
        password = "pass",
        companyName = "A",
        companyType = CompanyType.LIMITED_LIABILITY_COMPANY,
        taxId = "123",
        phoneNumber = "123",
        country = "PT",
        address = "street"
    )

    @Test
    fun `register throws when email already exists`() {

        every { userService.getUserByEmail(Email(registerRequest.email)) } returns Fixtures.userFixture().toResponse()

        assertThrows<AlreadyExistsException> {
            authService.register(registerRequest)
        }

        verify(exactly = 0) {
            userService.createUser(any())
        }
    }

    @Test
    fun `register creates user with encoded password`() {
        every { userService.getUserByEmail(Email(registerRequest.email)) } returns null
        every { passwordEncoder.encode(registerRequest.password) } returns "encoded"

        every { userService.createUser(any()) } returns Fixtures.userFixture().toResponse()

        authService.register(registerRequest)

        verify {
            passwordEncoder.encode(registerRequest.password)
            userService.createUser(match {
                it.email == registerRequest.email &&
                        it.password == "encoded"
            })
        }
    }

    @Test
    fun `login throws when authentication fails`() {
        val request = LoginRequest("test@test.com", "wrong")

        every { userService.getUserByEmail(Email(request.email)) } returns Fixtures.userFixture().toResponse()
        every {
            authenticationManager.authenticate(any())
        } throws InvalidCredentialsException()

        assertThrows<InvalidCredentialsException> {
            authService.login(request)
        }
    }

    @Test
    fun `login returns tokens when authentication succeeds`() {
        val request = LoginRequest("test@test.com", "pass")
        val user = Fixtures.userFixture(email = "test@test.com")

        every {
            authenticationManager.authenticate(any())
        } returns mockk()

        every { userService.getUserByEmail(Email(request.email)) } returns user.toResponse()

        every { jwtService.generateAccessToken(user.publicId) } returns "access"
        every { jwtService.generateRefreshToken(user.publicId) } returns "refresh"

        val result = authService.login(request)

        assertEquals("access", result.accessToken)
        assertEquals("refresh", result.refreshToken)

        verify {
            jwtService.generateAccessToken(user.publicId)
            jwtService.generateRefreshToken(user.publicId)
        }
    }

    @Test
    fun `refresh throws when token is null`() {
        assertThrows<InvalidTokenException> {
            authService.refresh(RefreshRequest(null))
        }
    }

    @Test
    fun `refresh throws when token is invalid`() {
        every { jwtService.isValid("bad") } returns false

        assertThrows<InvalidTokenException> {
            authService.refresh(RefreshRequest("bad"))
        }
    }

    @Test
    fun `refresh throws when user does not exist`() {
        val token = "valid"
        val uuid = UUID.randomUUID()

        every { jwtService.isValid(token) } returns true
        every { jwtService.extractPublicId(token) } returns uuid.toString()
        every { userService.getUser(uuid) } returns nullt

        assertThrows<NotFoundException> {
            authService.refresh(RefreshRequest(token))
        }
    }

    @Test
    fun `refresh returns new tokens`() {
        val token = "valid"
        val user = Fixtures.userFixture()

        every { jwtService.isValid(token) } returns true
        every { jwtService.extractPublicId(token) } returns user.publicId.toString()
        every { userService.getUser(user.publicId) } returns user

        every { jwtService.generateAccessToken(user.publicId) } returns "new-access"
        every { jwtService.generateRefreshToken(user.publicId) } returns "new-refresh"

        val result = authService.refresh(RefreshRequest(token))

        assertEquals("new-access", result.accessToken)
        assertEquals("new-refresh", result.refreshToken)
    }
}