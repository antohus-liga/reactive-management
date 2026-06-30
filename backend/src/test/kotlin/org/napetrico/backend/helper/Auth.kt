package org.napetrico.backend.helper

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

object Auth {
    fun setAuth(email: String) {
        val auth = UsernamePasswordAuthenticationToken(email, null, emptyList())
        val context = SecurityContextHolder.createEmptyContext()
        context.authentication = auth
        SecurityContextHolder.setContext(context)
    }

}