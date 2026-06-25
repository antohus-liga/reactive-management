package org.napetrico.backend.common.exceptions

class CannotEditCategoryTypeException(because: String) : RuntimeException(
    "Cannot edit category type, $because."
)