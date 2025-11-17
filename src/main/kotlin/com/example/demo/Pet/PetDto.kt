package com.example.demo.domain.pet.dto

//package com.example.demo.domain.pet.dto

import com.example.demo.domain.pet.Pet
import com.example.demo.domain.pet.PetGender
import java.time.LocalDate

// 1. 📋 "펫 등록 주문서" (Create)
data class PetCreateRequest(
    val name: String,
    val gender: PetGender,
    val size: String,
    val birthDate: LocalDate? = null,
    val weight: Double? = null,
    val specialNotes: String? = null
)

// 2. 📝 "펫 수정 주문서" (Update)
data class PetUpdateRequest(
    val name: String,
    val gender: PetGender,
    val size: String,
    val birthDate: LocalDate? = null,
    val weight: Double? = null,
    val specialNotes: String? = null
)

// 3. 🍽️ "펫 상세정보 서빙 쟁반" (Response)
// (UserDto의 PetProfileDto보다 더 자세한 정보)
data class PetResponse(
    val petId: Long,
    val name: String,
    val gender: PetGender,
    val size: String,
    val birthDate: LocalDate?,
    val weight: Double?,
    val specialNotes: String?,
    val ownerId: Long // 이 펫의 주인 ID
) {
    companion object {
        // "플레이팅 지시서"
        // Pet 엔티티(원재료)를 PetResponse(서빙 쟁반)로 변환
        fun from(pet: Pet): PetResponse {
            return PetResponse(
                petId = pet.id,
                name = pet.name,
                gender = pet.gender,
                size = pet.size,
                birthDate = pet.birthDate,
                weight = pet.weight,
                specialNotes = pet.specialNotes,
                ownerId = pet.owner.id
            )
        }
    }
}