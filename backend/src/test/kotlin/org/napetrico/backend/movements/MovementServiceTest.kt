package org.napetrico.backend.movements

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import org.napetrico.backend.common.enums.CompanyRole
import org.napetrico.backend.common.enums.MovementType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Discount
import org.napetrico.backend.common.values.Price
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.movements.MovementRepository
import org.napetrico.backend.features.movements.MovementService
import org.napetrico.backend.features.orders.Order
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

    companion object {

        @JvmStatic
        fun validMovements() = listOf(

            // Product movement
            Arguments.of(
                Fixtures.orderFixture(withRole = CompanyRole.CLIENT),
                CreateMovementRequest(
                    movementType = MovementType.OUTBOUND,
                    productPublicId = UUID.randomUUID(),
                    materialPublicId = null,
                    quantity = 2,
                    discount = "10%",
                    notes = "test"
                ),
                BigDecimal("180.00"), // 100 * 2 = 200 -> 10% off = 180
                true
            ),

            // Material movement
            Arguments.of(
                Fixtures.orderFixture(withRole = CompanyRole.SUPPLIER),
                CreateMovementRequest(
                    movementType = MovementType.INBOUND,
                    productPublicId = null,
                    materialPublicId = UUID.randomUUID(),
                    quantity = 3,
                    discount = "20%",
                    notes = null
                ),
                BigDecimal("120.00"), // 50 * 3 = 150 -> 20% off = 120
                false
            ),

            // No discount
            Arguments.of(
                Fixtures.orderFixture(withRole = CompanyRole.CLIENT),
                CreateMovementRequest(
                    movementType = MovementType.OUTBOUND,
                    productPublicId = UUID.randomUUID(),
                    materialPublicId = null,
                    quantity = 2,
                    discount = null,
                    notes = null
                ),
                BigDecimal("200.00"),
                true
            )
        )

        @JvmStatic
        fun roleViolations() = listOf(
            Arguments.of(
                Fixtures.orderFixture(withRole = CompanyRole.CLIENT),
                CreateMovementRequest(
                    movementType = MovementType.INBOUND,
                    productPublicId = null,
                    materialPublicId = UUID.randomUUID(),
                    quantity = 1,
                    notes = null,
                    discount = "0.5%+1.2%+2%"
                )
            ),
            Arguments.of(
                Fixtures.orderFixture(withRole = CompanyRole.SUPPLIER),
                CreateMovementRequest(
                    movementType = MovementType.OUTBOUND,
                    productPublicId = UUID.randomUUID(),
                    materialPublicId = null,
                    quantity = 1,
                    notes = null,
                    discount = "0.1%+0.2%"
                )
            )
        )
    }

    // ----------------------------
    // GET MOVEMENTS
    // ----------------------------

    @Test
    fun `gets movements by order`() {
        val order = Fixtures.orderFixture()

        val product = Fixtures.productFixture(price = Price.from(BigDecimal("10")))
        val material = Fixtures.materialFixture(unitPrice = Price.from(BigDecimal("2.5")))

        val m1 = Fixtures.movementFixture(order = order, product = product, quantity = 2)
        val m2 = Fixtures.movementFixture(order = order, material = material, quantity = 4)

        every { movementRepository.findAllByOrder(order) } returns listOf(m1, m2)

        val result = movementService.getMovementsByOrder(order)

        assertEquals(2, result.size)
    }

    @Test
    fun `gets movements by order applying discount`() {
        val order = Fixtures.orderFixture()

        val product = Fixtures.productFixture(
            price = Price.from(BigDecimal("100"))
        )

        val movement = Fixtures.movementFixture(
            order = order,
            product = product,
            quantity = 2,
            discount = Discount.from("10%")
        )

        every { movementRepository.findAllByOrder(order) } returns listOf(movement)

        val result = movementService.getMovementsByOrder(order)

        assertEquals(1, result.size)
        assertEquals(BigDecimal("180.00"), result.first().totalPrice)
    }

    // ----------------------------
    // SUCCESS CASES (parameterized)
    // ----------------------------

    @ParameterizedTest
    @MethodSource("validMovements")
    fun `creates movement successfully`(
        order: Order,
        request: CreateMovementRequest,
        expectedTotal: BigDecimal,
        isProduct: Boolean
    ) {
        every { movementRepository.save(any()) } answers { firstArg() }

        if (isProduct) {
            every {
                productService.getProduct(request.productPublicId!!, user)
            } returns Fixtures.productFixture(
                price = Price.from(BigDecimal("100"))
            )
        } else {
            every {
                materialService.getMaterial(request.materialPublicId!!, user)
            } returns Fixtures.materialFixture(
                unitPrice = Price.from(BigDecimal("50"))
            )
        }

        val response = movementService.createMovement(order, request, user)

        assertEquals(expectedTotal, response.totalPrice)
    }


    // ----------------------------
    // VALIDATION RULES
    // ----------------------------

    @Test
    fun `throws when both product and material provided`() {
        val order = Fixtures.orderFixture()

        val request = CreateMovementRequest(
            movementType = MovementType.OUTBOUND,
            productPublicId = UUID.randomUUID(),
            materialPublicId = UUID.randomUUID(),
            quantity = 1,
            notes = null,
            discount = null,
        )

        assertThrows<IllegalArgumentException> {
            movementService.createMovement(order, request, user)
        }

        verify(exactly = 0) { movementRepository.save(any()) }
    }

    @ParameterizedTest
    @MethodSource("roleViolations")
    fun `throws when role rules violated`(
        order: Order,
        request: CreateMovementRequest
    ) {
        assertThrows<IllegalArgumentException> {
            movementService.createMovement(order, request, user)
        }

        verify(exactly = 0) {
            movementRepository.save(any())
        }
    }

    // ----------------------------
    // DUPLICATES
    // ----------------------------

    @Test
    fun `throws when movement already exists`() {
        val product = Fixtures.productFixture()
        val material = Fixtures.materialFixture()
        val company = Fixtures.companyFixture(roles = setOf(CompanyRole.SUPPLIER, CompanyRole.CLIENT))

        val productOrder = Fixtures.orderFixture(
            company = company,
            withRole = CompanyRole.CLIENT,
        )

        val materialOrder = Fixtures.orderFixture(
            company = company,
            withRole = CompanyRole.SUPPLIER,
        )

        val productMovement = Fixtures.movementFixture(order = productOrder, product = product, movementType = MovementType.OUTBOUND)
        val materialMovement = Fixtures.movementFixture(order = materialOrder, material = material, movementType = MovementType.INBOUND)

        productOrder.movements = mutableSetOf(productMovement)
        materialOrder.movements = mutableSetOf(materialMovement)

        every {
            productService.getProduct(product.publicId, user)
        } returns product

        every {
            materialService.getMaterial(material.publicId, user)
        } returns material

        assertThrows<AlreadyExistsException> {
            movementService.createMovement(
                productOrder,
                CreateMovementRequest(
                    movementType = MovementType.OUTBOUND,
                    productPublicId = product.publicId,
                    materialPublicId = null,
                    quantity = 1,
                    notes = null,
                    discount = null,
                ),
                user
            )
        }

        assertThrows<AlreadyExistsException> {
            movementService.createMovement(
                materialOrder,
                CreateMovementRequest(
                    movementType = MovementType.INBOUND,
                    productPublicId = null,
                    materialPublicId = material.publicId,
                    quantity = 1,
                    notes = null,
                    discount = null,
                ),
                user
            )
        }
    }

    // ----------------------------
    // GET MOVEMENT
    // ----------------------------

    @Test
    fun `gets movement`() {
        val movement = Fixtures.movementFixture()

        every {
            movementRepository.findByPublicIdAndUser(movement.publicId, user)
        } returns movement

        val result = movementService.getMovement(movement.publicId, user)

        assertEquals(movement, result)
    }

    @Test
    fun `throws when movement not found`() {
        val id = UUID.randomUUID()

        every {
            movementRepository.findByPublicIdAndUser(id, user)
        } returns null

        assertThrows<NotFoundException> {
            movementService.getMovement(id, user)
        }
    }
}
