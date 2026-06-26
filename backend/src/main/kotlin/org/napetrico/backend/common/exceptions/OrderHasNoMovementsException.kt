package org.napetrico.backend.common.exceptions

class OrderHasNoMovementsException : RuntimeException(
    "This order cannot be completed due to having no movements attached to it."
)