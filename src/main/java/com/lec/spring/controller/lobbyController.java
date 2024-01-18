package com.lec.spring.controller;

import com.lec.spring.domain.Game_room;
import com.lec.spring.repository.Game_roomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class lobbyController {


    @Autowired
    private Game_roomRepository roomRepository;
    @GetMapping("api/room/connect")
    public boolean connectedRoom(String userName, String roomName) {
        //방 입장

        //todo
        Game_room newRoom = roomRepository.findBySubject(roomName).orElse(
                        Game_room.builder().
                                subject(roomName).
                                time(30).
                                max_player(8).
                                isLocked(false).
                                state(1).
                                build());
        roomRepository.save(newRoom);

        return true;
    }


}
