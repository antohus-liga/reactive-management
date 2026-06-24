package org.napetrico.backend.common.exceptions

class InvalidTokenException(tokenType: String) : RuntimeException(
    "$tokenType token is invalid or expired."
)