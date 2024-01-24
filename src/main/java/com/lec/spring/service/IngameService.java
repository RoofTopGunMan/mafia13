package com.lec.spring.service;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.Game_roomState;
import com.lec.spring.domain.User;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.Game_roomStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class IngameService {


    @Autowired
    private Game_roomRepository gameRoomRepository;

    @Autowired
    private Game_roomStateRepository game_roomStateRepository;

    @Autowired
    private SchedulerService schedulerService;

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
    public Game_room GameRoomfindByid(Long id) throws Exception {
        return gameRoomRepository.findById(id).orElseThrow(() -> new Exception("[GAMEROOM] ID IS INVALID "));


    }
    public List<defaultDTO> FindByUserListFromRoomId(Long roomId) throws Exception{
        Game_room findRoom = gameRoomRepository.findById(roomId).orElseThrow(() -> new Exception("ROOM ID IS INVALID "));
        List<defaultDTO> userList = findRoom.getUserListDTO();
        userList.sort(Comparator.comparing(o -> ((IngameUserRequestDTO) o)));
        return userList;
    }
    public Game_room GameRoomFindBySubject(String subject) {
        Game_room newRoom = gameRoomRepository.findBySubject(subject).orElse(createRoom(subject));

        return newRoom;

    }
    public Game_room createRoom(String subject){

        Game_room newRoom = Game_room.builder().
                subject(subject).
                time(30).
                max_player(8).
                isLocked(false).
                state(1).
                build();

        Game_roomState newState = new Game_roomState().initData();
        newState.setRoom(newRoom);
        newRoom.setRoomState(newState);
        return newRoom;
    }
    public boolean gameStart(Long roomId) throws Exception {

        Game_roomState roomState = getGameRoomState(roomId);
        if(roomState.isActive()) return false; // 이미 진행중인 방입니당.

        roomState.startGame();

        //각 유저들에게 직업 할당

        schedulerService.addSchedule(getGameRoomState(roomId));

        return true;
    }
    public Game_roomState getGameRoomState(Long roomId) throws Exception{
        //방 생성시에 state도 생성되어야함.
        return GameRoomfindByid(roomId).getRoomState();
    }

}
