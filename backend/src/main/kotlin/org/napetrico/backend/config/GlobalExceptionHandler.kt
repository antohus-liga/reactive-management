package org.napetrico.backend.config

import org.napetrico.backend.common.exceptions.InvalidEmailException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler{

    @ExceptionHandler
    fun handleInvalidEmailException(ex: InvalidEmailException) : ResponseEntity<Any> {
        return ResponseEntity(mapOf("error" to ex.message), HttpStatus.BAD_REQUEST)
    }
}