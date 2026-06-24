package org.napetrico.backend.common.values

import org.napetrico.backend.common.exceptions.InvalidEmailException

@JvmInline
value class Email(val value: String) {
    init {
        try {
            require(value.matches(Regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"))) {
                "Invalid email format"
            }
        } catch (_: IllegalArgumentException) {
            throw InvalidEmailException(value)
        }
    }

    override fun toString(): String = value
}