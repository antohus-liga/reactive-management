package org.napetrico.backend.common.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.UNAUTHORIZED)
class InvalidTokenException(tokenType: String) : RuntimeException(
    "$tokenType token is invalid or expired."
)