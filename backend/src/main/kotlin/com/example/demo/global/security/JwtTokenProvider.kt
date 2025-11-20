package com.example.demo.global.security

import com.example.demo.domain.user.UserRole
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import jakarta.annotation.PostConstruct
import jakarta.servlet.http.HttpServletRequest
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtTokenProvider {

    // 실제로는 application.yml에 숨겨야 하는 비밀키 (임시로 긴 문자열 사용)
    private val secretKeyRaw = "this-is-a-very-long-secret-key-for-security-purpose-1234567890"
    private val key = Keys.hmacShaKeyFor(secretKeyRaw.toByteArray())

    // 토큰 유효시간 (1시간)
    private val tokenValidityInMilliseconds = 1000L * 60 * 60

    // 토큰 생성
    fun createAccessToken(userId: Long, role: UserRole): String {
        val claims = Jwts.claims().setSubject(userId.toString())
        claims["role"] = role.name

        val now = Date()
        val validity = Date(now.time + tokenValidityInMilliseconds)

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    // 헤더에서 토큰 추출 ("Bearer sdkfj...")
    fun resolveToken(req: HttpServletRequest): String? {
        val bearerToken = req.getHeader("Authorization")
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7)
        }
        return null
    }

    // 토큰 유효성 검사
    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    // 토큰에서 userId 추출
    fun getUserId(token: String): Long {
        val claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).body
        return claims.subject.toLong()
    }
}