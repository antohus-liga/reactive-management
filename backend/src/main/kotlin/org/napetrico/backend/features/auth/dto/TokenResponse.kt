package org.napetrico.backend.features.auth.dto

data class TokenResponse(
    val accessToken: String,
    val refreshToken: String,
)
