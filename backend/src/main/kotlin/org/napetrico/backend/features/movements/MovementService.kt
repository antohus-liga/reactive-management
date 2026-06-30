package org.napetrico.backend.features.movements

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.movements.MovementMapper.toEntity
import org.napetrico.backend.features.movements.MovementMapper.toResponse
import org.napetrico.backend.features.orders.Order
import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.orders.dto.MovementResponse
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.features.users.User
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.UUID

@Service
class MovementService(
    val movementRepository: MovementRepository,
    val productService: ProductService,
    val materialService: MaterialService,
) {
    fun getMovementsByOrder(order: Order): List<MovementResponse> {
        val movements = movementRepository.findAllByOrder(order)

        return movements.map {
            it.toResponse(
                getTotalPrice(it.product?.price?.value ?: it.material!!.unitPrice.value, it.quantity)
            )
        }
    }

    @Transactional
    fun createMovement(order: Order, request: CreateMovementRequest, user: User): MovementResponse {
        if (!((request.productPublicId == null) xor (request.materialPublicId == null)))
            throw IllegalArgumentException("Exactly one of product or material must be provided.")

        if (
            order.withRole == CompanyRole.CLIENT
            && request.productPublicId == null
            && request.materialPublicId != null
        )
            throw IllegalArgumentException("Orders for companies with role CLIENT can only receive products.")
        else if (
            order.withRole == CompanyRole.SUPPLIER
            && request.productPublicId != null
            && request.materialPublicId == null
        )
            throw IllegalArgumentException("Orders for companies with role SUPPLIER can only provide materials.")

        val product = request.productPublicId?.let { productService.getProduct(it, user) }
        val material = request.materialPublicId?.let { materialService.getMaterial(it, user) }

        return movementRepository.save(
            request.toEntity(user, order, product, material)
        ).let {
            it.toResponse(
                getTotalPrice(it.product?.price?.value ?: it.material!!.unitPrice.value, it.quantity)
            )
        }
    }

    @Transactional
    fun deleteMovement(publicId: UUID, user: User) =
        movementRepository.deleteByPublicIdAndUser(publicId, user)

    private fun getTotalPrice(price: BigDecimal, quantity: Int): Price =
        Price.from(price.multiply(BigDecimal(quantity)))

    // Internal function, don't use in controllers
    fun getMovement(publicId: UUID, user: User): Movement =
        movementRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Movement")
}