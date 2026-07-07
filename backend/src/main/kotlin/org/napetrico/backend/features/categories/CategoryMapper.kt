package org.napetrico.backend.features.categories

import org.napetrico.backend.features.categories.dto.CategoryResponse
import org.napetrico.backend.features.categories.dto.CreateCategoryRequest
import org.napetrico.backend.features.categories.dto.UpdateCategoryRequest
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime

object CategoryMapper {
    fun Category.toResponse(): CategoryResponse = CategoryResponse(
        publicId = publicId,
        name = name,
        colorHex = colorHex,
        types = types,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateCategoryRequest.toEntity(user: User): Category = Category(
        name = name,
        colorHex = colorHex,
        types = types.toMutableSet(),
        user = user,
    )

    fun Category.applyUpdate(update: UpdateCategoryRequest): Category {
        name = update.name
        colorHex = update.colorHex
        types = update.types.toMutableSet()

        updatedAt = LocalDateTime.now()

        return this
    }
}