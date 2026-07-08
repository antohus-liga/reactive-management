package org.napetrico.backend.features.products

import org.napetrico.backend.common.values.Price
import org.napetrico.backend.common.values.SellingMargin
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.products.dto.CreateProductRequest
import org.napetrico.backend.features.products.dto.ProductResponse
import org.napetrico.backend.features.products.dto.UpdateProductRequest
import org.napetrico.backend.features.users.User
import java.time.LocalDateTime

object ProductMapper {
    fun Product.toResponse(): ProductResponse = ProductResponse(
        publicId = publicId,
        description = description,
        quantity = quantity,
        categoryDescription = category.name,
        categoryColor = category.colorHex,
        measurement = measurement,
        fixedPrice = fixedPrice?.value,
        sellingMargin = sellingMargin?.toString(),
        productionCost = productionCost.value,
        price = price.value,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateProductRequest.toEntity(user: User, category: Category): Product = Product(
        description = description,
        measurement = measurement,
        fixedPrice = fixedPrice?.let { Price(it) },
        sellingMargin = sellingMargin?.let { SellingMargin.from(it) },

        user = user,
        category = category,
    )

    fun Product.applyUpdate(
        update: UpdateProductRequest,
        category: Category,
        price: Price,
        productionCost: Price
    ): Product {
        description = update.description
        measurement = update.measurement
        quantity = update.quantity
        fixedPrice = update.fixedPrice?.let { Price(it) }
        sellingMargin = update.sellingMargin?.let { SellingMargin.from(it) }
        updatedAt = LocalDateTime.now()

        this.price = price
        this.category = category
        this.productionCost = productionCost

        return this
    }
}