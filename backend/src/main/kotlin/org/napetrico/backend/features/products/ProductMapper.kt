package org.napetrico.backend.features.products

import org.napetrico.backend.common.parsers.SellingMarginParser
import org.napetrico.backend.features.products.dto.ProductResponse
import java.math.BigDecimal

object ProductMapper {
    fun Product.toResponse(): ProductResponse = ProductResponse(
        publicId = publicId,
        description = description,
        quantity = quantity,
        categoryDescription = category.name,
        categoryColor = category.colorHex,
        measurement = measurement,
        fixedPrice = fixedPrice?.toBigDecimal(),
        sellingMargin = sellingMargin?.let { SellingMarginParser.parseToBigDecimal(it) },
        productionCost = BigDecimal(0), // TODO
        createdAt = createdAt,
        updatedAt = updatedAt,
    )
}