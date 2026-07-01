package org.napetrico.backend.common.exceptions

class OrderIsCompletedException : RuntimeException(
    "The order has already been completed."
)