package com.example.demo.domain.wizard.service

import com.example.demo.domain.place.Place
import com.example.demo.domain.place.repository.PlaceRepository
import com.example.demo.domain.wizard.dto.*
import com.example.demo.domain.wizard.repository.WizardAnswerRepository
import com.example.demo.domain.wizard.repository.WizardQuestionRepository
import org.springframework.stereotype.Service

@Service
class WizardService(
    private val questionRepository: WizardQuestionRepository,
    private val answerRepository: WizardAnswerRepository,
    private val placeRepository: PlaceRepository
) {

    fun getWizardQuestions(): List<WizardQuestionDto> {
        return questionRepository.findAllByOrderByStepAsc().map { q ->
            WizardQuestionDto(
                questionId = q.questionId,
                step = q.step,
                questionText = q.questionText,
                answers = q.answers.map { a ->
                    WizardAnswerDto(
                        answerId = a.answerId,
                        answerText = a.answerText,
                        matchingTag = a.matchingTag.name
                    )
                }
            )
        }
    }

    fun getRecommendations(
        request: WizardRecommendRequest,
        sort: String = "distance"
    ): List<Place> {

        val selectedAnswers = request.selectedAnswerIds.mapNotNull {
            answerRepository.findById(it).orElse(null)
        }

        val tags = selectedAnswers.map { it.matchingTag }

        var places = placeRepository.findByWizardTagsIn(tags)

        if (places.isEmpty()) {
            throw IllegalStateException("아쉽지만 맞는 장소를 찾지 못했어요.")
        }

        places = when (sort) {
            "rating" -> places.sortedByDescending { it.avgRating }
            "popular" -> places.sortedByDescending { it.reviewCount }
            else -> places.sortedBy { it.distanceFromUser } // 기본 거리
        }

        return places.take(3)
    }
}
