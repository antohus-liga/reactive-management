package org.napetrico.backend.common.exceptions

class AlreadyExistsException(what: String) : RuntimeException(
    "$what already exists."
)