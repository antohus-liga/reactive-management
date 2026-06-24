package org.napetrico.backend.common.exceptions

class InvalidEmailException(email: String) : RuntimeException(
    "Invalid email $email, an email has to have '@' and '.' characters."
)