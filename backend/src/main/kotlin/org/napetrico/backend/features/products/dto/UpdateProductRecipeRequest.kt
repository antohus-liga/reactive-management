package org.napetrico.backend.features.products.dto

import java.util.UUID

data class UpdateProductRecipeRequest(
    val productPublicId: UUID,
    val ingredients: Map<UUID, Int>,
)
