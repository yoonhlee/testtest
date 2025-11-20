package com.example.demo.global.exception

import com.example.demo.domain.user.dto.ApiResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    // 1. 비즈니스 로직 예외 (throw IllegalArgumentException)
    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgument(e: IllegalArgumentException): ResponseEntity<ApiResponse<Unit>> {
        return ResponseEntity.badRequest().body(
            ApiResponse(success = false, message = e.message ?: "잘못된 요청입니다.")
        )
    }

    // 2. 유효성 검사 실패 (@Valid 실패 시)
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(e: MethodArgumentNotValidException): ResponseEntity<ApiResponse<Unit>> {
        val message = e.bindingResult.allErrors.firstOrNull()?.defaultMessage ?: "유효성 검사 실패"
        return ResponseEntity.badRequest().body(
            ApiResponse(success = false, message = message)
        )
    }

    // 3. 나머지 모든 예외
    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): ResponseEntity<ApiResponse<Unit>> {
        e.printStackTrace() // 콘솔에 에러 로그 출력
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            ApiResponse(success = false, message = "서버 내부 오류가 발생했습니다.")
        )
    }
}