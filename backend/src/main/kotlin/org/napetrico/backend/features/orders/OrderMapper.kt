package org.napetrico.backend.features.orders

import org.napetrico.backend.features.companies.Company
import org.napetrico.backend.features.orders.dto.CreateOrderRequest
import org.napetrico.backend.features.orders.dto.OrderResponse
import org.napetrico.backend.features.users.User

object OrderMapper {
    fun Order.toResponse(): OrderResponse = OrderResponse(
        publicId = publicId,
        companyName = company.companyName,
        companyCountry = company.country,
        type = type,
        createdAt = createdAt,
        updatedAt = updatedAt,
    )

    fun CreateOrderRequest.toEntity(company: Company, user: User): Order = Order(
        type = type,

        company = company,
        user = user,
    )
}