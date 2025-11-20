package com.example.demo.global.file

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.util.UUID

@Service
class FileService {

    // 파일 저장 경로 (프로젝트 폴더 내 'uploads' 폴더)
    private val uploadDir = System.getProperty("user.dir") + "/uploads/"

    fun saveFile(file: MultipartFile): String {
        if (file.isEmpty) throw IllegalArgumentException("파일이 비어있습니다.")

        // 폴더가 없으면 생성
        val folder = File(uploadDir)
        if (!folder.exists()) folder.mkdirs()

        // 파일명 중복 방지를 위한 UUID 생성
        val originalName = file.originalFilename ?: "unknown.jpg"
        val savedFileName = "${UUID.randomUUID()}_$originalName"
        val savePath = File(uploadDir + savedFileName)

        // 파일 저장
        file.transferTo(savePath)

        // 접근 가능한 URL 반환 (예: /images/uuid_dog.jpg)
        return "/images/$savedFileName"
    }
}