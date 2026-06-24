package org.napetrico.backend.common.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.CONFLICT)
class AlreadyExistsException(what: String) : RuntimeException(
    "$what already exists."
)