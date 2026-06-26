package org.napetrico.backend.features.materials

import jakarta.transaction.Transactional
import org.napetrico.backend.common.enums.CategoryType
import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.features.categories.Category
import org.napetrico.backend.features.categories.CategoryService
import org.napetrico.backend.features.materials.MaterialMapper.applyUpdate
import org.napetrico.backend.features.materials.MaterialMapper.toEntity
import org.napetrico.backend.features.materials.MaterialMapper.toResponse
import org.napetrico.backend.features.materials.dto.CreateMaterialRequest
import org.napetrico.backend.features.materials.dto.MaterialRequest
import org.napetrico.backend.features.materials.dto.MaterialResponse
import org.napetrico.backend.features.materials.dto.UpdateMaterialRequest
import org.napetrico.backend.features.products.Product
import org.napetrico.backend.features.users.User
import org.napetrico.backend.features.users.UserService
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class MaterialService(
    private val materialRepository: MaterialRepository,
    private val userService: UserService,
    private val categoryService: CategoryService
) {

    fun getAllByUser(): List<MaterialResponse> =
        materialRepository.findAllByUser(userService.getCurrentUser()).map { it.toResponse() }

    fun createMaterial(request: CreateMaterialRequest): MaterialResponse {
        val user = userService.getCurrentUser()
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category)

        return materialRepository.save(request.toEntity(category, user)).toResponse()
    }

    fun updateMaterial(publicId: UUID, request: UpdateMaterialRequest): MaterialResponse {
        val user = userService.getCurrentUser()
        val material = getMaterial(publicId, user)
        val category = categoryService.getCategory(request.categoryPublicId)

        validateRequest(request, user, category, material)

        return materialRepository.save(material.applyUpdate(request, category)).toResponse()
    }

    @Transactional
    fun deleteMaterial(publicId: UUID) =
        materialRepository.deleteByPublicIdAndUser(publicId, userService.getCurrentUser())

    private fun validateRequest(request: MaterialRequest, user: User, category: Category, material: Material? = null) {
        val conflict = materialRepository.findByDescriptionAndUser(
            request.description,
            user
        )

        if (
            conflict != null &&
            (request !is UpdateMaterialRequest || conflict.id != material?.id)
        ) {
            throw AlreadyExistsException(
                "Material with description ${request.description}"
            )
        }

        if (category.type == CategoryType.PRODUCT)
            throw IllegalArgumentException("${category.name} category cannot be used because it's a product category.")
    }

    // Internal function, don't use in controllers
    fun getAllByPublicIds(publicIds: List<UUID>): List<Material> {
        val user = userService.getCurrentUser()
        return publicIds.map { getMaterial(it, user) }
    }

    // Internal function, don't use in controllers
    fun getMaterial(publicId: UUID, user: User): Material =
        materialRepository.findByPublicIdAndUser(publicId, user)
            ?: throw NotFoundException("Material")

    fun changeMaterialQuantity(material: Material, quantity: Int) =
        materialRepository.save(material.apply { this.quantity = quantity })
}