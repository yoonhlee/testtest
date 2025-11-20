package com.example.demo.domain.user
import com.example.demo.domain.pet.Pet
import jakarta.persistence.*
import com.example.demo.global.entity.BaseTimeEntity
@Entity
@Table(name = "users")
class User (
    @Column(nullable = false, unique = true, length = 50)
    val loginId: String,

    @Column(nullable = false, unique = true, length = 100)
    var email: String,

    @Column(nullable = false)
    var passwordHash: String,

    @Column(nullable = false, length = 50)
    var nickname: String,

    @Column(length = 500)
    var profileImage: String? = null,

    // 주인(1) : 펫(N) 관계
    @OneToMany(mappedBy = "owner", cascade = [CascadeType.ALL], orphanRemoval = true)
    val pets: MutableList<Pet> = mutableListOf()
): BaseTimeEntity(){
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    val userId: Long = 0

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var role: UserRole = UserRole.USER
        protected set

    @Column(nullable = false)
    var isActive: Boolean = true
        protected set

    fun updateProfile(nickname: String, profileImage: String?) {
        this.nickname = nickname
        this.profileImage = profileImage
    }

    fun updatePassword(newPasswordHash: String) {
        this.passwordHash = newPasswordHash
    }

    // 회원탈퇴시 isActive = false로 만들어 관리
    fun deactivate() {
        this.isActive = false
    }
}

enum class UserRole {
    USER, ADMIN
}