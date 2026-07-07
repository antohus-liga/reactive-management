package org.napetrico.backend.features.categories.dto

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.CategoryType

data class UpdateCategoryRequest(

    @field:Size(max = 60)
    val name: String,

    @field:Pattern(regexp = "^#?([a-f0-9]{6}|[a-f0-9]{3})$", message = "Color must be in hex format")
    val colorHex: String,

    @field:NotEmpty
    val types: Set<CategoryType>,
)
