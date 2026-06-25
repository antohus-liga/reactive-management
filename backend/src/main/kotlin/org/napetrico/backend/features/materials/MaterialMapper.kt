package org.napetrico.backend.features.materials

import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.materials.dto.CreateMaterialRequest
import org.napetrico.backend.features.materials.dto.MaterialResponse
import org.napetrico.backend.features.materials.dto.UpdateMaterialRequest
import org.napetrico.backend.features.users.User

object MaterialMapper {
    fun Material.toResponse(): MaterialResponse = MaterialResponse(
        publicId = publicId,
        description = description,
        categoryDescription = category.name,
        categoryColor = category.colorHex,
        measurement = measurement,
        unitPrice = unitPrice.value,
    )

    fun CreateMaterialRequest.toEntity(category: Category, user: User): Material = Material(
        description = description,
        measurement = measurement,
        unitPrice = Price.from(unitPrice),

        category = category,
        user = user,
    )

    fun Material.applyUpdate(update: UpdateMaterialRequest, category: Category): Material {
        description = update.description
        measurement = update.measurement
        unitPrice = Price.from(update.unitPrice)
        quantity = update.quantity

        this.category = category

        return this
    }
}