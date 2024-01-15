package com.lec.spring.controller;

import com.lec.spring.domain.Game_room;
import com.lec.spring.repository.Game_roomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class lobbyController {


    @Autowired
    private Game_roomRepository roomRepository;
    @GetMapping("api/room/connect")
    public boolean connectedRoom(String userName) {
        //방 입장
        Game_room newRoom = new Game_room();
        newRoom.setGame_title("roomName001");

        roomRepository.save(newRoom);

        return true;
    }


}
