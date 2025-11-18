package com.example.demo.domain.pet

// 1. User 엔티티를 import 해야 합니다.
import com.example.demo.domain.user.User
import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "pets") // DB에 'pets' 테이블 생성
class Pet(
    @Column(nullable = false)
    var name: String,

    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // "MALE", "FEMALE" 문자열로 저장
    var gender: PetGender,

    @Column(nullable = false)
    var size: String, // (SDS 참고: 소형견, 중형견, 대형견 등)

    var birthDate: LocalDate? = null, // 생일 (선택)

    var weight: Double? = null, // 몸무게 (선택)

    var specialNotes: String? = null, // 특이사항 (선택)

    // 2. ⭐️⭐️⭐️ 핵심 관계 ⭐️⭐️⭐️
    // 이 펫의 '주인'이 누구인지 알려줍니다.
    // 펫(N) : 유저(1) 관계입니다.
    @ManyToOne(fetch = FetchType.LAZY) // (성능 최적화를 위해 LAZY 사용)
    @JoinColumn(name = "user_id", nullable = false) // DB에 'user_id' 컬럼 생성
    var owner: User

) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()

    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
        protected set

    // 3. (추가) 펫 정보 수정을 위한 헬퍼 메서드
    fun updateInfo(name: String, gender: PetGender, size: String, birthDate: LocalDate?, weight: Double?, specialNotes: String?) {
        this.name = name
        this.gender = gender
        this.size = size
        this.birthDate = birthDate
        this.weight = weight
        this.specialNotes = specialNotes
        this.updatedAt = LocalDateTime.now()
    }
}

// 펫의 성별 (선택지)
enum class PetGender {
    MALE, FEMALE, UNKNOWN
}