package org.napetrico.backend.materials

import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.enums.MeasurementType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.InsufficientQuantityException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.categories.CategoryService
import org.napetrico.backend.features.materials.MaterialRepository
import org.napetrico.backend.features.materials.MaterialService
import org.napetrico.backend.features.materials.dto.CreateMaterialRequest
import org.napetrico.backend.features.materials.dto.UpdateMaterialRequest
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import java.math.BigDecimal
import java.util.UUID
import kotlin.test.Test

class MaterialServiceTest {

    private val materialRepository = mockk<MaterialRepository>()
    private val userService = mockk<UserService>()
    private val categoryService = mockk<CategoryService>()

    private val materialService = MaterialService(
        materialRepository,
        userService,
        categoryService
    )

    private val user = Fixtures.userFixture()

    @Test
    fun `gets all materials`() {
        val material1 = Fixtures.materialFixture(description = "Flour")
        val material2 = Fixtures.materialFixture(description = "Sugar")

        every { userService.getCurrentUser() } returns user
        every { materialRepository.findAllByUser(user) } returns listOf(material1, material2)

        val result = materialService.getAllByUser()

        assertEquals(2, result.size)
    }

    @Test
    fun `creates material`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.MATERIAL))

        val request = CreateMaterialRequest(
            description = "Flour",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            unitPrice = BigDecimal("10")
        )

        every { userService.getCurrentUser() } returns user
        every { categoryService.getCategory(category.publicId) } returns category
        every { materialRepository.findByDescriptionAndUser(request.description, user) } returns null
        every { materialRepository.save(any()) } answers { firstArg() }

        val response = materialService.createMaterial(request)

        assertEquals("Flour", response.description)
    }

    @Test
    fun `throws when material already exists`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.MATERIAL))

        val request = CreateMaterialRequest(
            description = "Flour",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            unitPrice = BigDecimal("10")
        )

        every { userService.getCurrentUser() } returns user
        every { categoryService.getCategory(category.publicId) } returns category
        every {
            materialRepository.findByDescriptionAndUser(request.description, user)
        } returns Fixtures.materialFixture(description = "Flour")

        assertThrows<AlreadyExistsException> {
            materialService.createMaterial(request)
        }

        verify(exactly = 0) {
            materialRepository.save(any())
        }
    }

    @Test
    fun `throws when category is product type`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))

        val request = CreateMaterialRequest(
            description = "Flour",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            unitPrice = BigDecimal("10")
        )

        every { userService.getCurrentUser() } returns user
        every { categoryService.getCategory(category.publicId) } returns category
        every { materialRepository.findByDescriptionAndUser(request.description, user) } returns null

        assertThrows<IllegalArgumentException> {
            materialService.createMaterial(request)
        }
    }

    @Test
    fun `updates material`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.MATERIAL))
        val material = Fixtures.materialFixture()

        val request = UpdateMaterialRequest(
            description = "Updated Flour",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            unitPrice = BigDecimal("10"),
            quantity = 1,
        )

        every { userService.getCurrentUser() } returns user
        every { materialRepository.findByPublicIdAndUser(material.publicId, user) } returns material
        every { categoryService.getCategory(category.publicId) } returns category
        every { materialRepository.findByDescriptionAndUser(request.description, user) } returns null
        every { materialRepository.save(any()) } answers { firstArg() }

        val response = materialService.updateMaterial(material.publicId, request)

        assertEquals("Updated Flour", response.description)
    }

    @Test
    fun `throws when updating to existing description`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.MATERIAL))
        val material = Fixtures.materialFixture()
        val conflict = Fixtures.materialFixture(id = 1, description = "Flour")

        val request = UpdateMaterialRequest(
            description = "Flour",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            unitPrice = BigDecimal("10"),
            quantity = 1,
        )

        every { userService.getCurrentUser() } returns user
        every { materialRepository.findByPublicIdAndUser(material.publicId, user) } returns material
        every { categoryService.getCategory(category.publicId) } returns category
        every { materialRepository.findByDescriptionAndUser(request.description, user) } returns conflict

        assertThrows<AlreadyExistsException> {
            materialService.updateMaterial(material.publicId, request)
        }
    }

    @Test
    fun `throws when category is product`() {
        val category = Fixtures.categoryFixture(types = setOf(CategoryType.PRODUCT))
        val material = Fixtures.materialFixture()

        val request = UpdateMaterialRequest(
            description = "Flour",
            categoryPublicId = category.publicId,
            measurement = MeasurementType.BAG,
            unitPrice = BigDecimal("10"),
            quantity = 1,
        )

        every { userService.getCurrentUser() } returns user
        every { materialRepository.findByDescriptionAndUser(request.description, user) } returns null
        every { materialRepository.findByPublicIdAndUser(material.publicId, user) } returns material
        every { categoryService.getCategory(category.publicId) } returns category

        assertThrows<IllegalArgumentException> {
            materialService.updateMaterial(material.publicId, request)
        }
    }

    @Test
    fun `deletes material`() {
        val publicId = UUID.randomUUID()

        every { userService.getCurrentUser() } returns user
        every {
            materialRepository.deleteByPublicIdAndUser(publicId, user)
        } just Runs

        materialService.deleteMaterial(publicId)

        verify {
            materialRepository.deleteByPublicIdAndUser(publicId, user)
        }
    }

    @Test
    fun `gets material`() {
        val material = Fixtures.materialFixture()

        every {
            materialRepository.findByPublicIdAndUser(material.publicId, user)
        } returns material

        val result = materialService.getMaterial(material.publicId, user)

        assertEquals(material, result)
    }

    @Test
    fun `throws when material not found`() {
        val id = UUID.randomUUID()

        every {
            materialRepository.findByPublicIdAndUser(id, user)
        } returns null

        assertThrows<NotFoundException> {
            materialService.getMaterial(id, user)
        }
    }

    @Test
    fun `changes material quantity`() {
        val material = Fixtures.materialFixture(quantity = 5)

        every {
            materialRepository.save(material)
        } answers { firstArg() }

        materialService.changeMaterialQuantity(material, 10)

        assertEquals(10, material.quantity)

        verify {
            materialRepository.save(material)
        }
    }

    @Test
    fun `consumes materials`() {
        val flour = Fixtures.materialFixture(
            description = "Flour",
            quantity = 20
        )

        val sugar = Fixtures.materialFixture(
            description = "Sugar",
            quantity = 10
        )

        val recipe = listOf(
            Fixtures.productMaterialFixture(
                material = flour,
                quantity = 2
            ),
            Fixtures.productMaterialFixture(
                material = sugar,
                quantity = 1
            )
        )

        materialService.consumeMaterials(
            recipe = recipe,
            productionQuantity = 3
        )

        assertEquals(14, flour.quantity) // 20 - (2 * 3)
        assertEquals(7, sugar.quantity)  // 10 - (1 * 3)
    }

    @Test
    fun `throws when material quantity is insufficient`() {
        val flour = Fixtures.materialFixture(
            description = "Flour",
            quantity = 5
        )

        val recipe = listOf(
            Fixtures.productMaterialFixture(
                material = flour,
                quantity = 2
            )
        )

        assertThrows<InsufficientQuantityException> {
            materialService.consumeMaterials(
                recipe = recipe,
                productionQuantity = 3 // needs 6, only has 5
            )
        }

        // Quantity should remain unchanged
        assertEquals(5, flour.quantity)
    }
}
