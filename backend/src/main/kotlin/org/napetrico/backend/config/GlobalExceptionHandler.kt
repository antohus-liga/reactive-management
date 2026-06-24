package org.napetrico.backend.config

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler{

    @ExceptionHandler(Exception::class)
    fun exceptionHandler(ex: Exception): Map<String, String> {
        return mapOf("error" to (ex.message ?: "Unexpected error"))
    }
}