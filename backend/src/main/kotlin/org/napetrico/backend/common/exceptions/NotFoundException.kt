package org.napetrico.backend.common.exceptions

class NotFoundException(what: String) : RuntimeException(
    "$what not found."
)