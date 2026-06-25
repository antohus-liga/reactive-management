package org.napetrico.backend.config

import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.InvalidCredentialsException
import org.napetrico.backend.common.exceptions.InvalidTokenException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler{

    @ExceptionHandler(AlreadyExistsException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleAlreadyExistsException(ex: AlreadyExistsException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(InvalidCredentialsException::class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    fun handleInvalidCredentialsException(ex: InvalidCredentialsException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(IllegalArgumentException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleIllegalArgumentException(ex: IllegalArgumentException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(InvalidTokenException::class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    fun handleInvalidTokenException(ex: InvalidTokenException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(NotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handleNotFoundException(ex: NotFoundException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(Exception::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun handleExceptionFallback(ex: Exception): Map<String, String> =
        mapOf("error" to (ex.message ?: "Unknown error"))
}