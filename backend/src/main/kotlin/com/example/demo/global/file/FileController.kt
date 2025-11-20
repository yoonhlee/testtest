package com.example.demo.global.file

import com.example.demo.domain.user.dto.ApiResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/images")
class FileController(
    private val fileService: FileService
) {
    @PostMapping("/upload")
    fun uploadImage(@RequestParam("file") file: MultipartFile): ResponseEntity<ApiResponse<String>> {
        val imageUrl = fileService.saveFile(file)
        return ResponseEntity.ok(
            ApiResponse(success = true, message = "이미지 업로드 성공", data = imageUrl)
        )
    }
}