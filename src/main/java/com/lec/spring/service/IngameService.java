package com.lec.spring.service;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import com.lec.spring.repository.Game_roomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

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
        return newRoom;
    }
    public List<defaultDTO> FindByUserListFromRoomId(Long roomId) throws Exception{
        Game_room findRoom = gameRoomRepository.findById(roomId).orElseThrow(() -> new Exception("ROOM ID IS INVALID "));
        List<defaultDTO> userList = findRoom.getUserListDTO();
        userList.sort(Comparator.comparing(o -> ((IngameUserRequestDTO) o)));
        return userList;
    }
    public Game_room GameRoomFindBySubject(String subject) {
        Game_room newRoom = gameRoomRepository.findBySubject(subject).
                orElse(
                Game_room.builder().
                subject(subject).
                time(30).
                max_player(8).
                isLocked(false).
                state(1).
                build()
        );
        gameRoomRepository.save(newRoom);
        return newRoom;

    }

}
