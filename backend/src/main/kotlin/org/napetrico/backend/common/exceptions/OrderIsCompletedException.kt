package org.napetrico.backend.common.exceptions

class OrderIsCompletedException : RuntimeException(
    "The order has already been completed. You can't neither add movements to it nor complete it again."
)