package org.napetrico.backend.common.values

@JvmInline
value class Email(val value: String) {
    init {
        require(value.matches(Regex("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"))) {
            "Invalid email format"
        }
    }
}