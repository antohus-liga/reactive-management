package org.napetrico.backend.common.exceptions

class CannotDeleteProductionOrderException : RuntimeException(
    "Cannot delete production orders with status 'COMPLETED' or 'IN_PROGRESS'."
)