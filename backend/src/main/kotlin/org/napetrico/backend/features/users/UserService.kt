package org.napetrico.backend.features.users

import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.values.Email
import org.napetrico.backend.features.users.UserMapper.toEntity
import org.napetrico.backend.features.users.UserMapper.toResponse
import org.napetrico.backend.features.users.dto.CreateUserRequest
import org.napetrico.backend.features.users.dto.UserResponse
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
) {
    fun getUserByEmail(email: Email): UserResponse? =
        userRepository.findByEmail(email.toString())?.toResponse()

    fun createUser(createUserRequest: CreateUserRequest): UserResponse =
        userRepository.save(createUserRequest.toEntity()).toResponse()

    fun getCurrentUser(): User {
        val email = SecurityContextHolder.getContext().authentication?.name
            ?: throw NotFoundException("User")
        return userRepository.findByEmail(email)
            ?: throw NotFoundException("Email $email")
    }

    fun getCurrentUserResponse(): UserResponse {
        val email = SecurityContextHolder.getContext().authentication?.name
            ?: throw NotFoundException("User")
        return userRepository.findByEmail(email)?.toResponse()
            ?: throw NotFoundException("Email $email")
    }
}