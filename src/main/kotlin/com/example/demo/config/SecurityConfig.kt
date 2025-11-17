package com.example.demo.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class SecurityConfig {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        // BCryptPasswordEncoder는 가장 널리 쓰이는 표준 암호화 방식
        return BCryptPasswordEncoder()
    }
}