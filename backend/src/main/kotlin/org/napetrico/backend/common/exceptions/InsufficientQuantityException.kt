package org.napetrico.backend.common.exceptions

class InsufficientQuantityException(material: String, totalNeeded: Int, available: Int) : RuntimeException(
    "Not enough '$material' in stock. " +
            "Required: $totalNeeded, available: $available"
)