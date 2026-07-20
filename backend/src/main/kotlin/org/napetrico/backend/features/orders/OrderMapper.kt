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
        createdAt = createdAt,
        updatedAt = updatedAt,
        withRole = withRole,
        isCompleted = isCompleted,
        completedAt = completedAt,
        debit = debit,
        credit = credit,
    )

    fun CreateOrderRequest.toEntity(company: Company, user: User): Order = Order(
        withRole = withRole,

        company = company,
        user = user,
    )
}