package com.example.demo.global.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebMvcConfig : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        // /images/** 로 요청이 오면 -> 로컬의 uploads 폴더를 보여줘라
        val uploadPath = "file:///" + System.getProperty("user.dir") + "/uploads/"

        registry.addResourceHandler("/images/**")
            .addResourceLocations(uploadPath)
    }
}