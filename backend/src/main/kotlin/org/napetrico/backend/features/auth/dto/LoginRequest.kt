package org.napetrico.backend.features.auth.dto

import org.napetrico.backend.common.values.Email

data class LoginRequest(
    val email: String,
    val password: String,
)
