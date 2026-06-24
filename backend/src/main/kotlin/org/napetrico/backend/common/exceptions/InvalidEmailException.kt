package org.napetrico.backend.common.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class InvalidEmailException(email: String) : RuntimeException(
    "Invalid email $email, an email has to have '@' and '.' characters."
)