package org.napetrico.backend.common.exceptions

class AlreadyExistsException(val entityType: String, val value: String) : RuntimeException(
    "$entityType $value already exists."
)