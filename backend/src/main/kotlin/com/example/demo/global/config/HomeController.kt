package com.example.demo.global.config

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeController {

    @GetMapping("/")
    fun home(): String {
        return "반려동물 플랫폼 API 서버가 정상 작동 중입니다!"
    }
}