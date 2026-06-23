package org.napetrico.backend.features.auth

import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.auth.dto.LoginRequest
import org.napetrico.backend.features.auth.dto.RefreshRequest
import org.napetrico.backend.features.auth.dto.RegisterRequest
import org.napetrico.backend.features.auth.dto.TokenResponse
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.features.users.dto.CreateUserRequest
import org.napetrico.backend.features.users.dto.UserResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AuthService(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager,
) {
    fun register(request: RegisterRequest) {
        userService.getUserByEmail(request.email)?.let {
            throw RuntimeException("Email ${it.email} already exists.")
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
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.email, request.password),
        )

        val user = userService.getUserByEmail(request.email)!!
        return TokenResponse(
            accessToken = jwtService.generateAccessToken(user.email),
            refreshToken = jwtService.generateRefreshToken(user.email)
        )
    }

    fun refresh(request: RefreshRequest): TokenResponse {
        if (!jwtService.isValid(request.refreshToken)) {
            throw RuntimeException("Refresh token is invalid.")
        }

        val email = jwtService.extractEmail(request.refreshToken)
        val user = userService.getUserByEmail(Email(email))
            ?: throw RuntimeException("User with email $email not found.")

        return TokenResponse(
            accessToken = jwtService.generateAccessToken(user.email),
            refreshToken = jwtService.generateRefreshToken(user.email)
        )
    }
}