package org.napetrico.backend.features.users

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

    fun getCurrentUser(): UserResponse {
        val email = SecurityContextHolder.getContext().authentication?.name
            ?: throw RuntimeException("User not found")
        return userRepository.findByEmail(email)?.toResponse()
            ?: throw RuntimeException("Email $email doesn't exist")
    }
}