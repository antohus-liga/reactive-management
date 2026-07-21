package org.napetrico.backend.config

import org.napetrico.backend.common.exceptions.AlreadyExistsException
import org.napetrico.backend.common.exceptions.CannotDeleteProductionOrderException
import org.napetrico.backend.common.exceptions.CannotEditCategoryTypeException
import org.napetrico.backend.common.exceptions.InsufficientQuantityException
import org.napetrico.backend.common.exceptions.InvalidCredentialsException
import org.napetrico.backend.common.exceptions.InvalidTokenException
import org.napetrico.backend.common.exceptions.NegativeQuantityException
import org.napetrico.backend.common.exceptions.NotFoundException
import org.napetrico.backend.common.exceptions.OrderHasNoMovementsException
import org.napetrico.backend.common.exceptions.OrderIsCompletedException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(AlreadyExistsException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleAlreadyExistsException(ex: AlreadyExistsException): Map<String, Any> =
        mapOf(
            "error" to "error.alreadyExists",
            "params" to mapOf("entityType" to ex.entityType, "value" to ex.value)
        )
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

    @ExceptionHandler(CannotEditCategoryTypeException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleCannotEditCategoryTypeException(ex: CannotEditCategoryTypeException): Map<String, Any> =
        mapOf(
            "error" to "error.cannotEditCategoryType",
            "params" to mapOf("dependencyCount" to ex.dependencyCount)
        )
    @ExceptionHandler(NegativeQuantityException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleCannotEditCategoryTypeException(ex: NegativeQuantityException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(OrderHasNoMovementsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleCannotEditCategoryTypeException(ex: OrderHasNoMovementsException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(CannotDeleteProductionOrderException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleCannotDeleteProductionOrderException(ex: CannotDeleteProductionOrderException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(InsufficientQuantityException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleInsufficientQuantityException(ex: InsufficientQuantityException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(MethodArgumentNotValidException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleMethodArgumentNotValidException(ex: MethodArgumentNotValidException): ResponseEntity<Map<String, Any>> {
        val errors = ex.bindingResult
            .allErrors
            .filterIsInstance<FieldError>()
            .associate { it.field to (it.defaultMessage ?: "Invalid value") }

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(
                mapOf(
                    "message" to "Validation failed",
                    "errors" to errors
                )
            )
    }

    @ExceptionHandler(OrderIsCompletedException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleOrderIsCompletedException(ex: OrderIsCompletedException): Map<String, String> =
        mapOf("error" to ex.message!!)

    @ExceptionHandler(Exception::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun handleExceptionFallback(ex: Exception): Map<String, String> =
        mapOf("error" to (ex.message ?: "Unknown error"))
}