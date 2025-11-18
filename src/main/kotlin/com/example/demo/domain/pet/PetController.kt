package com.example.demo.domain.pet

import com.example.demo.domain.pet.dto.PetCreateRequest
import com.example.demo.domain.pet.dto.PetResponse
import com.example.demo.domain.pet.dto.PetUpdateRequest
import com.example.demo.domain.user.dto.ApiResponse // (공통 응답 DTO)
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api") // (공통 주소 /api)
class PetController(
    private val petService: PetService
) {

    /**
     * 1. 펫 등록 (C)
     * POST /api/users/{userId}/pets
     */
    @PostMapping("/users/{userId}/pets")
    fun createPet(
        @PathVariable userId: Long,
        @Valid @RequestBody request: PetCreateRequest
    ): ResponseEntity<ApiResponse<PetResponse>> {

        val petResponse = petService.createPet(userId, request)
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse(success = true, message = "반려동물이 등록되었습니다.", data = petResponse))
    }

    /**
     * 2. 특정 사용자의 모든 펫 조회 (R)
     * GET /api/users/{userId}/pets
     */
    @GetMapping("/users/{userId}/pets")
    fun getPetsByUserId(
        @PathVariable userId: Long
    ): ResponseEntity<ApiResponse<List<PetResponse>>> {

        val pets = petService.getPetsByUserId(userId)
        return ResponseEntity.ok(ApiResponse(success = true, message = "반려동물 목록 조회 성공.", data = pets))
    }

    /**
     * 3. 펫 정보 수정 (U)
     * PUT /api/pets/{petId}
     * (보안상: 실제로는 userId를 *로그인 토큰*에서 꺼내야 하지만, 지금은 파라미터로 받습니다)
     */
    @PutMapping("/users/{userId}/pets/{petId}")
    fun updatePet(
        @PathVariable userId: Long, // (보안상: 나중에 토큰으로 대체)
        @PathVariable petId: Long,
        @Valid @RequestBody request: PetUpdateRequest
    ): ResponseEntity<ApiResponse<PetResponse>> {

        val updatedPet = petService.updatePet(userId, petId, request)
        return ResponseEntity.ok(ApiResponse(success = true, message = "반려동물 정보가 수정되었습니다.", data = updatedPet))
    }

    /**
     * 4. 펫 삭제 (D)
     * DELETE /api/pets/{petId}
     * (보안상: 실제로는 userId를 *로그인 토큰*에서 꺼내야 하지만, 지금은 파라미터로 받습니다)
     */
    @DeleteMapping("/users/{userId}/pets/{petId}")
    fun deletePet(
        @PathVariable userId: Long, // (보안상: 나중에 토큰으로 대체)
        @PathVariable petId: Long
    ): ResponseEntity<ApiResponse<Unit>> { // (데이터가 없으므로 Unit)

        petService.deletePet(userId, petId)
        return ResponseEntity.ok(ApiResponse(success = true, message = "반려동물 정보가 삭제되었습니다."))
    }
}