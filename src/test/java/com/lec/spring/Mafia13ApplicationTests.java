package com.lec.spring;

import com.lec.spring.domain.Game_room;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.Game_roomStateRepository;
import com.lec.spring.service.IngameService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Mafia13ApplicationTests {

	@Autowired
	Game_roomRepository gameRoomRepository;

	@Autowired
	Game_roomStateRepository game_roomStateRepository;

	@Autowired
	IngameService ingameService;

	@Test
	void TestStart() {
		System.out.println("=============================");
		System.out.println("=============================");
		System.out.println("=============================");


		Game_room room = ingameService.createRoom("ㅇㅇ");


		System.out.println("*****************************");
		System.out.println("*****************************");
		System.out.println("*****************************");
	}

}
