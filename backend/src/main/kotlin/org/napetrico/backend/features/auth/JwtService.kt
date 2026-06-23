package org.napetrico.backend.features.auth

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.napetrico.backend.common.values.Email
import org.springframework.stereotype.Service
import java.time.Duration
import java.util.Date
import javax.crypto.SecretKey

@Service
class JwtService {

    private val secretKey: SecretKey by lazy {
        val secret = System.getenv("JWT_SECRET") ?: "my-secret-key-i-guess"
        Keys.hmacShaKeyFor(secret.toByteArray())
    }

    private val accessTokenExpiry = Duration.ofMinutes(15)
    private val refreshTokenExpiry = Duration.ofDays(7)

    fun generateAccessToken(email: Email): String =
        buildToken(email, accessTokenExpiry)

    fun generateRefreshToken(email: Email): String =
        buildToken(email, refreshTokenExpiry)

    private fun buildToken(
        email: Email,
        expiry: Duration
    ): String = Jwts.builder()
        .subject(email.toString())
        .issuedAt(Date())
        .expiration(Date(System.currentTimeMillis() + expiry.toMillis()))
        .signWith(secretKey)
        .compact()

    fun extractEmail(token: String): String =
        parseClaims(token).subject

    fun isValid(token: String): Boolean = runCatching {
        parseClaims(token).expiration.after(Date())
    }.getOrDefault(false)

    private fun parseClaims(token: String): Claims =
        Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .payload

}