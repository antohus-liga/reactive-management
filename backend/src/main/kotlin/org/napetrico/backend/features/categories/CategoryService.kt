package org.napetrico.backend.features.categories

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.CannotEditCategoryTypeException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.categories.CategoryMapper.applyUpdate
import org.napetrico.backend.features.categories.CategoryMapper.toEntity
import org.napetrico.backend.features.categories.CategoryMapper.toResponse
import org.napetrico.backend.features.categories.dto.CategoryResponse
import org.napetrico.backend.features.categories.dto.CreateCategoryRequest
import org.napetrico.backend.features.categories.dto.UpdateCategoryRequest
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.util.*

@Service
class CategoryService(
    private val categoryRepository: CategoryRepository,
    private val userService: UserService,
) {
    fun getAllByUser(): List<CategoryResponse> =
        categoryRepository.findAllByUser(userService.getCurrentUser()).map { it.toResponse() }

    fun createCategory(request: CreateCategoryRequest): CategoryResponse {
        val user = userService.getCurrentUser()
        if (categoryRepository.findByNameAndUser(request.name, user) != null)
            throw AlreadyExistsException("Category with name '${request.name}'")

        return categoryRepository.save(request.toEntity(user)).toResponse()
    }

    fun updateCategory(publicId: UUID, request: UpdateCategoryRequest): CategoryResponse {
        val user = userService.getCurrentUser()
        val category = categoryRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Category")

        val dependencyCount =
            if (request.types.contains(CategoryType.PRODUCT)) category.products.count()
            else if (request.types.contains(CategoryType.MATERIAL)) category.materials.count()
            else category.products.count() + category.materials.count()

        if (dependencyCount > 0) {
            throw CannotEditCategoryTypeException(
                "there are $dependencyCount dependencies preventing type change"
            )
        }

        val conflict = categoryRepository.findByNameAndUser(request.name, user)

        if (conflict != null && category.id != conflict.id)
            throw AlreadyExistsException("Category with name '${request.name}'")

        return categoryRepository.save(category.applyUpdate(request)).toResponse()
    }

    @Transactional
    fun deleteCategory(publicId: UUID) =
        categoryRepository.deleteByPublicIdAndUser(publicId, userService.getCurrentUser())

    // Internal function, don't use in controllers
    fun getCategory(publicId: UUID): Category =
        categoryRepository.findByPublicId(publicId)
            ?: throw NotFoundException("Category")
}