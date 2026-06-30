package org.napetrico.backend.categories

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.assertThrows
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.CannotEditCategoryTypeException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.categories.CategoryRepository
import org.napetrico.backend.features.categories.CategoryService
import org.napetrico.backend.features.categories.dto.CreateCategoryRequest
import org.napetrico.backend.features.categories.dto.UpdateCategoryRequest
import org.napetrico.backend.features.users.UserService
import org.napetrico.backend.helper.Fixtures
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals

class CategoryServiceTest {

    private val categoryRepository = mockk<CategoryRepository>()
    private val userService = mockk<UserService>()
    private val categoryService = CategoryService(categoryRepository, userService)
    private val user = Fixtures.userFixture("user", "123")

    @Test
    fun `creates category`() {
        val request = CreateCategoryRequest(
            name = "Chemical",
            colorHex = "",
            type = CategoryType.MATERIAL,
        )

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByNameAndUser(request.name, user) } returns null
        every { categoryRepository.save(any()) } answers { firstArg() }

        val response = categoryService.createCategory(request)

        assertEquals("Chemical", response.name)
    }

    @Test
    fun `throws when category already exists on create`() {
        val category = Fixtures.categoryFixture(name = "Food")
        val request = CreateCategoryRequest("Food", "", CategoryType.MATERIAL)

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByNameAndUser(category.name, user) } returns category

        assertThrows<AlreadyExistsException> { categoryService.createCategory(request) }
    }

    @Test
    fun `updates category with different name`() {
        val category = Fixtures.categoryFixture()
        val request = UpdateCategoryRequest("ABC", "123", CategoryType.BOTH)

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByPublicIdAndUser(category.publicId, user) } returns category
        every { categoryRepository.findByNameAndUser(request.name, user) } returns null
        every { categoryRepository.save(category) } answers { firstArg() }

        val response = categoryService.updateCategory(category.publicId, request)

        assertEquals("ABC", response.name)
        assertEquals("123", response.colorHex)
        assertEquals(CategoryType.BOTH, response.type)
    }

    @Test
    fun `updates category with same name`() {
        val category = Fixtures.categoryFixture(name = "ABC")
        val request = UpdateCategoryRequest("ABC", "123", CategoryType.BOTH)

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByPublicIdAndUser(category.publicId, user) } returns category
        every { categoryRepository.findByNameAndUser(request.name, user) } returns category
        every { categoryRepository.save(category) } answers { firstArg() }

        val response = categoryService.updateCategory(category.publicId, request)

        assertEquals("ABC", response.name)
        assertEquals("123", response.colorHex)
        assertEquals(CategoryType.BOTH, response.type)
    }

    @Test
    fun `throws when category does not exist on edit`() {
        val request = UpdateCategoryRequest("", "", CategoryType.MATERIAL)

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByPublicIdAndUser(any(), user) } returns null

        assertThrows<NotFoundException> { categoryService.updateCategory(UUID.randomUUID(), request) }
    }

    @Test
    fun `throws when dependencies exist on edit`() {
        val category = Fixtures.categoryFixture()
        val request = UpdateCategoryRequest("", "", CategoryType.MATERIAL)
        category.products = mutableSetOf(Fixtures.productFixture())

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByPublicIdAndUser(category.publicId, user) } returns category

        assertThrows<CannotEditCategoryTypeException> { categoryService.updateCategory(category.publicId, request) }
    }

    @Test
    fun `throws when conflict exists on edit`() {
        val category = Fixtures.categoryFixture()
        val conflict = Fixtures.categoryFixture(id = 1)
        val request = UpdateCategoryRequest("", "", CategoryType.MATERIAL)

        every { userService.getCurrentUser() } returns user
        every { categoryRepository.findByPublicIdAndUser(category.publicId, user) } returns category
        every { categoryRepository.findByNameAndUser(request.name, user) } returns conflict

        assertThrows<AlreadyExistsException> { categoryService.updateCategory(category.publicId, request) }
    }

    @Test
    fun `gets category`() {
        val category = Fixtures.categoryFixture()

        every { categoryRepository.findByPublicId(category.publicId) } returns category

        val result = categoryService.getCategory(category.publicId)

        assertEquals(category, result)
    }

    @Test
    fun `throws when category not found`() {
        val publicId = UUID.randomUUID()

        every { categoryRepository.findByPublicId(publicId) } returns null

        assertThrows<NotFoundException> { categoryService.getCategory(publicId) }
    }
}