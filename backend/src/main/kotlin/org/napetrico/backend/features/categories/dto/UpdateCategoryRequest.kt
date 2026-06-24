package org.napetrico.backend.features.categories.dto

import org.napetrico.backend.common.enums.CategoryType

data class UpdateCategoryRequest(
    val name: String,
    val colorHex: String,
    val type: CategoryType,
)
