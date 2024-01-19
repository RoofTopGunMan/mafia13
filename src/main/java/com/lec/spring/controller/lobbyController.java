package com.lec.spring.controller;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class lobbyController {


    @Autowired
    private Game_roomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;
    @GetMapping("api/room/connect")
    public Game_room connectedRoom(long userId, String roomName) throws Exception {
        //방 입장

        Game_room newRoom = roomRepository.findBySubject(roomName).orElse(
                        Game_room.builder().
                                subject(roomName).
                                time(30).
                                max_player(8).
                                isLocked(false).
                                state(1).
                                build());


        User connectedUser = userRepository.findById(userId).orElseThrow(() -> new Exception("Miss match User ID"));
        connectedUser.setGame_Room(newRoom);

        if(newRoom.getOwner_id() == null) {
            newRoom.setOwner_id(connectedUser.getId());
        }
        roomRepository.save(newRoom);
        userRepository.save(connectedUser);
        return newRoom;
    }


}
