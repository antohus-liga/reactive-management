package org.napetrico.backend.features.auth

import org.napetrico.backend.features.auth.dto.LoginRequest
import org.napetrico.backend.features.auth.dto.RefreshRequest
import org.napetrico.backend.features.auth.dto.RegisterRequest
import org.napetrico.backend.features.auth.dto.TokenResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<String> {
        try {
            authService.register(request)
        } catch (e: RuntimeException) {
            return ResponseEntity(e.message, HttpStatus.CONFLICT)
        }

        return ResponseEntity.ok().build()
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<TokenResponse> {
        return try {
            ResponseEntity.ok(authService.login(request))
        } catch (e: BadCredentialsException) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }

    @PostMapping("/refresh")
    fun refresh(@RequestBody request: RefreshRequest): ResponseEntity<TokenResponse> {
        return try {
            ResponseEntity.ok(authService.refresh(request))
        } catch (e: RuntimeException) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }
}