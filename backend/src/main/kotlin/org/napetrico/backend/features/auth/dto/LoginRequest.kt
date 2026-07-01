package org.napetrico.backend.features.auth.dto

data class LoginRequest(
    val email: String,
    val password: String,
)
