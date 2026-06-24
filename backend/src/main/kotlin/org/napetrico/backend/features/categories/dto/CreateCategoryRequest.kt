package org.napetrico.backend.features.categories.dto

import org.napetrico.backend.common.enums.CategoryType

data class CreateCategoryRequest(
    val name: String,
    val colorHex: String,
    val type: CategoryType,
)
