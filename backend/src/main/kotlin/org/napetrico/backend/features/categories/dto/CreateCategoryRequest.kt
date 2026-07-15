package org.napetrico.backend.features.categories.dto

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import org.napetrico.backend.common.enums.CategoryType

data class CreateCategoryRequest(

    @field:Size(max = 60, message = "validation.name")
    val name: String,

    @field:Pattern(regexp = "^#?([a-f0-9]{6}|[a-f0-9]{3})$", message = "validation.colorHex")
    val colorHex: String,

    @field:NotEmpty(message = "validation.types")
    val types: Set<CategoryType>,
)
