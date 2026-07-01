package org.napetrico.backend.features.auth

import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import jakarta.validation.Valid
import org.napetrico.backend.features.auth.dto.LoginRequest
import org.napetrico.backend.features.auth.dto.RefreshRequest
import org.napetrico.backend.features.auth.dto.RegisterRequest
import org.napetrico.backend.features.auth.dto.TokenResponse
import org.napetrico.backend.features.users.dto.UpdateUserRequest
import org.napetrico.backend.features.users.dto.UserResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
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
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<String> {
        authService.register(request)

        return ResponseEntity.ok().build()
    }

    @PostMapping("/login")
    fun login(
        @RequestBody request: LoginRequest,
        response: HttpServletResponse,
    ): ResponseEntity<Unit> {
        val tokens = authService.login(request)
        response.addAuthCookies(tokens)

        return ResponseEntity.ok().build()
    }

    @PostMapping("/refresh")
    fun refresh(
        request: HttpServletRequest,
        response: HttpServletResponse,
    ): ResponseEntity<TokenResponse> {
        val refreshToken = request.cookies
            ?.find { it.name == "refreshToken" }?.value

        val tokens = authService.refresh(RefreshRequest(refreshToken))
        response.addAuthCookies(tokens)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Unit> {
        response.addCookie(createCookie("accessToken", "", 0, "/"))
        response.addCookie(createCookie("refreshToken", "", 0, "/api/auth/refresh"))
        return ResponseEntity.ok().build()
    }

    @PostMapping("/update")
    fun update(@Valid @RequestBody request: UpdateUserRequest): ResponseEntity<UserResponse> =
        ResponseEntity.ok(authService.updateUser(request))

    @GetMapping("/me")
    fun me(): ResponseEntity<UserResponse> {
        return ResponseEntity.ok(authService.getCurrentUser())
    }

    fun HttpServletResponse.addAuthCookies(tokens: TokenResponse) {
        addCookie(
            createCookie(
                "accessToken",
                tokens.accessToken,
                15 * 60,
                "/"
            )
        )          // 15 min
        addCookie(
            createCookie(
                "refreshToken",
                tokens.refreshToken,
                7 * 24 * 60 * 60,
                "/api/auth/refresh"
            )
        ) // 7 days
    }

    fun createCookie(name: String, value: String, maxAgeSeconds: Int, path: String): Cookie =
        Cookie(name, value).apply {
            isHttpOnly = false
            secure = false       // HTTPS only — set to false for local dev
            this.path = path
            maxAge = maxAgeSeconds
            setAttribute("SameSite", "Lax")
        }
}