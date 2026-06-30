package org.napetrico.backend.features.movements

import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.materials.Material
import org.napetrico.backend.features.orders.Order
import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.orders.dto.MovementResponse
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User

object MovementMapper {
    fun Movement.toResponse(totalPrice: Price): MovementResponse = MovementResponse(
        publicId = publicId,
        productDescription = product?.description,
        productPrice = product?.price?.value,
        materialDescription = material?.description,
        materialUnitPrice = material?.unitPrice?.value,
        quantity = quantity,
        totalPrice = totalPrice.value,
        notes = notes,
    )

    fun CreateMovementRequest.toEntity(
        user: User,
        order: Order,
        product: Product?,
        material: Material?
    ): Movement = Movement(
        quantity = quantity,
        notes = notes,

        user = user,
        order = order,
        product = product,
        material = material,
    )
}