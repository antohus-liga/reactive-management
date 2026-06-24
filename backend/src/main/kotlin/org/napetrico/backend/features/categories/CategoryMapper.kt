package org.napetrico.backend.features.categories

import org.napetrico.backend.features.categories.dto.CategoryResponse
import org.napetrico.backend.features.categories.dto.CreateCategoryRequest
import org.napetrico.backend.features.categories.dto.UpdateCategoryRequest
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime
import java.time.ZoneOffset

object CategoryMapper {
    fun Category.toResponse(): CategoryResponse = CategoryResponse(
        publicId = publicId,
        name = name,
        colorHex = colorHex,
        type = type,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateCategoryRequest.toEntity(user: User): Category = Category(
        name = name,
        colorHex = colorHex,
        type = type,
        user = user,
    )

    fun Category.applyUpdate(update: UpdateCategoryRequest): Category {
        name = update.name
        colorHex = update.colorHex
        type = update.type

        updatedAt = LocalDateTime.now()

        return this
    }
}