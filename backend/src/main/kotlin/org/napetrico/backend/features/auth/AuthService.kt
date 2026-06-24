package org.napetrico.backend.features.auth

import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.InvalidCredentialsException
import org.napetrico.backend.common.exceptions.InvalidTokenException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.auth.dto.LoginRequest
import org.napetrico.backend.features.auth.dto.RefreshRequest
import org.napetrico.backend.features.auth.dto.RegisterRequest
import org.napetrico.backend.features.auth.dto.TokenResponse
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.features.users.dto.CreateUserRequest
import org.napetrico.backend.features.users.dto.UserResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager,
) {
    fun register(request: RegisterRequest) {
        userService.getUserByEmail(Email(request.email))?.let {
            throw AlreadyExistsException("Email ${it.email}")
        }

        val createUserRequest = CreateUserRequest(
            email = request.email,
            password = passwordEncoder.encode(request.password)!!,

            companyName = request.companyName,
            companyType = request.companyType,
            taxId = request.taxId,
            phoneNumber = request.phoneNumber,
            country = request.country,
            address = request.address,
        )

        userService.createUser(createUserRequest)
    }

    fun login(request: LoginRequest): TokenResponse {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    request.email, request.password
                )
            )
        } catch (_: AuthenticationException) {
            throw InvalidCredentialsException()
        }

        val user = userService.getUserByEmail(Email(request.email))!!
        return TokenResponse(
            accessToken = jwtService.generateAccessToken(Email(user.email)),
            refreshToken = jwtService.generateRefreshToken(Email(user.email))
        )
    }

    fun refresh(request: RefreshRequest): TokenResponse {
        if (request.refreshToken == null || !jwtService.isValid(request.refreshToken)) {
            throw InvalidTokenException("Refresh")
        }

        val email = jwtService.extractEmail(request.refreshToken)
        val user = userService.getUserByEmail(Email(email))
            ?: throw NotFoundException("User with email $email")

        return TokenResponse(
            accessToken = jwtService.generateAccessToken(Email(user.email)),
            refreshToken = jwtService.generateRefreshToken(Email(user.email))
        )
    }

    fun getCurrentUser(): UserResponse = userService.getCurrentUserResponse()
}