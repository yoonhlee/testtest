package com.example.demo.global.config

import com.example.demo.global.security.JwtAuthenticationFilter
import com.example.demo.global.security.JwtTokenProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtTokenProvider: JwtTokenProvider
) {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // REST API는 CSRF 불필요
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) } // 세션 미사용
            .authorizeHttpRequests {
                it.requestMatchers(
                    "/api/users/signup", "/api/users/login",
                    "/api/users/find-id", "/api/users/reset-password",
                    "/api/images/**", // 이미지는 누구나 볼 수 있게
                    "/api/map/**", "/api/places/**", "/api/wizard/**" // 지도, 장소 조회는 로그인 없이도 가능하게? (정책에 따라 변경)
                ).permitAll()
                    .anyRequest().authenticated() // 나머지는 로그인 필요
            }
            .addFilterBefore(
                JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter::class.java
            )

        return http.build()
    }
}