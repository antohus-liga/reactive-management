package org.napetrico.backend.common.exceptions

class CannotEditCategoryTypeException(val dependencyCount: Int) : RuntimeException(
    "Cannot edit category type, $dependencyCount dependencies preventing type change."
)