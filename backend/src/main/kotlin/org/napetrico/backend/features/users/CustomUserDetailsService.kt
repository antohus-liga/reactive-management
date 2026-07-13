package org.napetrico.backend.features.users

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class CustomUserDetailsService(
    private val userRepository: UserRepository,
) : UserDetailsService {

    override fun loadUserByUsername(publicId: String): UserDetails {
        val user = userRepository.findByPublicId(UUID.fromString(publicId))
            ?: throw UsernameNotFoundException("This user is not registered")
        return User(
            user.email.toString(),
            user.password,
            emptyList()
        )
    }
}