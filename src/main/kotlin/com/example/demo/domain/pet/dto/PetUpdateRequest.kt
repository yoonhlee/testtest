package com.example.demo.domain.pet.dto

import com.example.demo.domain.pet.PetGender
import java.time.LocalDate

data class PetUpdateRequest(
    val name: String,
    val gender: PetGender,
    val size: String,
    val birthDate: LocalDate? = null,
    val weight: Double? = null,
    val specialNotes: String? = null
)