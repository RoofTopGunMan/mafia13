package com.lec.spring.service;

import com.lec.spring.domain.Game_room;
import com.lec.spring.repository.Game_roomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IngameService {


    @Autowired
    private Game_roomRepository gameRoomRepository;


    public Game_room createGameRoom() {
        Game_room newRoom = Game_room.builder().
                subject("").
                time(30).
                max_player(8).
                isLocked(false).
                state(1).
                build();
        gameRoomRepository.save(newRoom);
        return newRoom;
    }
    public Game_room GameRoomFindBySubject(String subject ) {
        Game_room newRoom = gameRoomRepository.findBySubject(subject).orElse(createGameRoom());
        newRoom.setSubject(subject);

        gameRoomRepository.save(newRoom);
        return newRoom;

    }

}
