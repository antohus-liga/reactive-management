package org.napetrico.backend.features.categories.dto

import org.napetrico.backend.common.enums.CategoryType
import java.time.LocalDateTime
import java.util.UUID

data class CategoryResponse(
    val publicId: UUID,
    val name: String,
    val colorHex: String,
    val types: Set<CategoryType>,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)
