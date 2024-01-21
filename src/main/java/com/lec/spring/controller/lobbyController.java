package com.lec.spring.controller;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.service.DevelopService;
import com.lec.spring.service.IngameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class lobbyController {


    @Autowired
    private Game_roomRepository roomRepository;

    @Autowired
    private IngameService ingameService;
    @Autowired
    private DevelopService developService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("api/room/connect")
    public Game_room connectedRoom(long userId, String roomName) throws Exception {
        //방 입장

        User connectedUser = developService.UserFindById(userId);
        Game_room newRoom = ingameService.GameRoomFindBySubject(roomName);

        if(newRoom.getUserList().isEmpty()){
            newRoom.setOwner_id(connectedUser.getId());
        }
        connectedUser.setRoom(newRoom);

        userRepository.save(connectedUser);
        roomRepository.save(newRoom);
        return newRoom;
    }


}
