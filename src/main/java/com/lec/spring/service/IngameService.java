package com.lec.spring.service;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.domain.*;
import com.lec.spring.repository.Game_JobDataRepository;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.Game_roomStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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

    @Autowired
    private Game_JobDataRepository jobRepository;

    public Game_room createGameRoom() {
        Game_room newRoom = Game_room.builder().
                subject("").
                time(30).
                max_player(8).
                isLocked(false).
                state(1).
                build();
        List<Game_jobData> jobList = jobRepository.findAll();
        List<Game_roomJobState> jobState = new ArrayList<>();

        for (Game_jobData jobData :
             jobList) {
            jobState .add(Game_roomJobState.builder().
                    jobData(jobData).
                    jobCount(1).
                    room(newRoom).
                    build());

        }
        newRoom.setJobState(jobState);
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
    public Game_room createRoom(String subject){

        Game_room newRoom = createGameRoom();
        newRoom.setSubject(subject);

        Game_roomState newState = new Game_roomState().initData();
        newState.setRoom(newRoom);
        newRoom.setRoomState(newState);
        return newRoom;
    }
    public boolean gameEnd(Long roomId) throws Exception{
        Game_roomState roomState = getGameRoomState(roomId);
        Game_room room = gameRoomRepository.findById(roomId).orElse(null);
        if(room == null) return false; // 방 없는데요
        if(!roomState.isActive()) return false; // 이미 진행중인 방입니당.

        roomState.setActive(false);

        game_roomStateRepository.save(roomState);
        schedulerService.removeSchedule(roomId);
        return true;

    }
    public boolean gameStart(Long roomId) throws Exception {

        Game_roomState roomState = getGameRoomState(roomId);
        Game_room room = gameRoomRepository.findById(roomId).orElse(null);
        if(room == null) return false; // 방 없는데요
        
        if(room.getUserList().size() < 4) // 유저수 미만
                return false;
        if(roomState.isActive()) return false; // 이미 진행중인 방입니당.
        
        roomState.startGame();

        List<User> userList = room.getUserList();

        int index = 0;
        for(int i = 0 ; i <userList.size();i++){
            userList.get(i).setIngame_Job(jobRepository.findByName("시민")); // 시민으로 초기화
        }
        for (Game_roomJobState jobState: // 직업 가짓 수 만큼 루프
              room.getJobState()) {
            if(jobState.getJobData().getName() != "시민") { // 시민제외
                int currentJobCount =jobState.getJobCount(); // 설정에 등록된 직업갯수 가져오기
                while(currentJobCount > 0)
                {
                    userList.get(index).setIngame_Job(jobState.getJobData()); // 0번 유저부터 해당 직업 설정
                    index++;
                    currentJobCount--;
                }
            }
        }
        Collections.swap(userList,0,userList.size()); // 유저 직업 스왑

        room.setUserList(userList); // 직업 분배

        game_roomStateRepository.save(roomState);

        //각 유저들에게 직업 할당
        schedulerService.addSchedule(roomId, getGameRoomState(roomId));

        return true;
    }
    public Game_roomState getGameRoomState(Long roomId) throws Exception{
        //방 생성시에 state도 생성되어야함.
        return GameRoomfindByid(roomId).getRoomState();
    }

    public Game_room GameRoomFindBySubject(String subject) {
        Game_room newRoom = gameRoomRepository.findBySubject(subject).orElse(createRoom(subject));

        return newRoom;

    }
}
