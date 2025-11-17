// ⭐️ 1. 이 파일은 'com/example/demo' 폴더에 있으므로, 패키지는 반드시 이게 되어야 합니다.
package com.example.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SEprojectApplication // ⭐️ 2. 파일 이름과 클래스 이름이 일치합니다.

fun main(args: Array<String>) {
	// ⭐️ 3. '어디가개Application' 클래스를 실행시킵니다.
	runApplication<SEprojectApplication>(*args)
}