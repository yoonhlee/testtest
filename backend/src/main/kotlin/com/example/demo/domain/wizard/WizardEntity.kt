package com.example.demo.domain.wizard

import com.example.demo.domain.place.model.WizardTag
import com.example.demo.global.entity.BaseTimeEntity
import jakarta.persistence.*
import org.springframework.data.jpa.domain.support.AuditingEntityListener

@Entity
@Table(name = "wizard_questions")
@EntityListeners(AuditingEntityListener::class)
class WizardQuestion(
    @Column(nullable = false)
    val step: Int,

    @Column(nullable = false, length = 200)
    val questionText: String,

    @OneToMany(mappedBy = "question", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val answers: MutableList<WizardAnswer> = mutableListOf()
): BaseTimeEntity() {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val questionId: Long = 0
}

@Entity
@Table(name = "wizard_answers")
@EntityListeners(AuditingEntityListener::class)
class WizardAnswer(
    @Column(nullable = false, length = 200)
    val answerText: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    val matchingTag: WizardTag, // PlaceEnum.kt에 정의된 Enum 사용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    val question: WizardQuestion
): BaseTimeEntity() {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val answerId: Long = 0
}