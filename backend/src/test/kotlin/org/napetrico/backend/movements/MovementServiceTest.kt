package org.napetrico.backend.movements

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.verify
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.movements.MovementRepository
import org.napetrico.backend.features.movements.MovementService
import org.napetrico.backend.features.orders.dto.CreateMovementRequest
import org.napetrico.backend.features.products.ProductService
import org.napetrico.backend.helper.Fixtures
import java.math.BigDecimal
import java.util.UUID
import kotlin.test.Test

class MovementServiceTest {

    private val movementRepository = mockk<MovementRepository>()
    private val productService = mockk<ProductService>()
    private val materialService = mockk<MaterialService>()

    private val movementService = MovementService(
        movementRepository,
        productService,
        materialService
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `gets movements by order`() {
        val order = Fixtures.orderFixture()

        val product = Fixtures.productFixture(
            price = Price.from(BigDecimal("10.00"))
        )

        val material = Fixtures.materialFixture(
            unitPrice = Price.from(BigDecimal("2.50"))
        )

        val movement1 = Fixtures.movementFixture(
            order = order,
            product = product,
            material = null,
            quantity = 3
        )

        val movement2 = Fixtures.movementFixture(
            order = order,
            product = null,
            material = material,
            quantity = 4
        )

        every {
            movementRepository.findAllByOrder(order)
        } returns listOf(movement1, movement2)

        val response = movementService.getMovementsByOrder(order)

        assertEquals(2, response.size)

        assertEquals(
            BigDecimal("30.00"),
            response[0].totalPrice
        )

        assertEquals(
            BigDecimal("10.00"),
            response[1].totalPrice
        )
    }

    @Test
    fun `creates product movement`() {
        val order = Fixtures.orderFixture()

        val product = Fixtures.productFixture(
            price = Price.from(BigDecimal("15.00"))
        )

        val request = CreateMovementRequest(
            quantity = 2,
            productPublicId = product.publicId,
            materialPublicId = null,
            notes = null,
        )

        every {
            productService.getProduct(product.publicId, user)
        } returns product

        every {
            movementRepository.save(any())
        } answers { firstArg() }

        val response = movementService.createMovement(
            order,
            request,
            user
        )

        assertEquals(BigDecimal("30.00"), response.totalPrice)
    }

    @Test
    fun `creates material movement`() {
        val order = Fixtures.orderFixture()

        val material = Fixtures.materialFixture(
            unitPrice = Price.from(BigDecimal("4.50"))
        )

        val request = CreateMovementRequest(
            quantity = 3,
            productPublicId = null,
            materialPublicId = material.publicId,
            notes = null,
        )

        every {
            materialService.getMaterial(material.publicId, user)
        } returns material

        every {
            movementRepository.save(any())
        } answers { firstArg() }

        val response = movementService.createMovement(
            order,
            request,
            user
        )

        assertEquals(BigDecimal("13.50"), response.totalPrice)
    }

    @Test
    fun `throws when both product and material are provided`() {
        val request = CreateMovementRequest(
            quantity = 1,
            productPublicId = UUID.randomUUID(),
            materialPublicId = UUID.randomUUID(),
            notes = null
        )

        assertThrows<IllegalArgumentException> {
            movementService.createMovement(
                Fixtures.orderFixture(),
                request,
                user
            )
        }

        verify(exactly = 0) { movementRepository.save(any()) }
    }

    @Test
    fun `throws when neither product nor material are provided`() {
        val request = CreateMovementRequest(
            quantity = 1,
            productPublicId = null,
            materialPublicId = null,
            notes = null
        )

        assertThrows<IllegalArgumentException> {
            movementService.createMovement(
                Fixtures.orderFixture(),
                request,
                user
            )
        }

        verify(exactly = 0) { movementRepository.save(any()) }
    }

    @Test
    fun `gets movement`() {
        val movement = Fixtures.movementFixture()

        every {
            movementRepository.findByPublicIdAndUser(
                movement.publicId,
                user
            )
        } returns movement

        val result = movementService.getMovement(
            movement.publicId,
            user
        )

        assertEquals(movement, result)
    }

    @Test
    fun `throws when movement does not exist`() {
        val publicId = UUID.randomUUID()

        every {
            movementRepository.findByPublicIdAndUser(
                publicId,
                user
            )
        } returns null

        assertThrows<NotFoundException> {
            movementService.getMovement(
                publicId,
                user
            )
        }
    }
}
