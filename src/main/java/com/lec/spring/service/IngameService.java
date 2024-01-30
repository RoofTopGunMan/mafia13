package com.lec.spring.service;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.domain.*;
import com.lec.spring.repository.Game_JobDataRepository;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.Game_roomStateRepository;
import com.lec.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class IngameService {


    @Autowired
    private Game_roomRepository gameRoomRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Game_roomStateRepository game_roomStateRepository;

    @Autowired
    private SchedulerService schedulerService;

    @Autowired
    private Game_JobDataRepository jobRepository;

    @Transactional
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
    @Transactional
    public Game_room connectRoom(Long userId,String roomName){

        User connectedUser = userRepository.findById(userId).orElseThrow();

        Game_room connectRoom = GameRoomFindBySubject(roomName);

        if(connectRoom.getUserList().isEmpty()){
            connectRoom.setOwner_id(connectedUser.getId());
        }

        connectedUser.setRoom(connectRoom);

        gameRoomRepository.save(connectRoom);
        userRepository.save(connectedUser);

        return connectRoom;
    }


    @Transactional
    public List<defaultDTO> getUserList(Long roomId) throws Exception{


        System.out.println(" == 1");
        Game_room findRoom = gameRoomRepository.findById(roomId).orElseThrow(() -> new Exception("ROOM ID IS INVALID "));

        System.out.println(" == 2");

        List<defaultDTO> userList = findRoom.getUserListDTO();
        System.out.println(" == 3");
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
    @Transactional
    public boolean gameStart(Long roomId) throws Exception {

        Game_roomState roomState = getGameRoomState(roomId);
        Game_room room = gameRoomRepository.findById(roomId).orElse(null);
        if(room == null) return false; // 방 없는데요
        
        if(room.getUserList().size() < 4) // 유저수 미만
                return false;
        if(roomState.isActive()) return false; // 이미 진행중인 방입니당.
        
        roomState.startGame();

        List<User> userList = room.getUserList();

        List<Game_jobData> jobData = jobRepository.findAll();
        int index = 0;
        List<String> jobNameList = new ArrayList<>();

        for (Game_roomJobState jobState: // 해당 방의 직업 수 만큼 루프
                room.getJobState()) {
            if (jobState.getJobData().getName() == "시민") continue; // 시민은 예외
            for(int i = 0 ; i < jobState.getJobCount();i++)
                jobNameList.add(jobState.getJobData().getName()); // 추가
        }
        for(int i = jobNameList.size();i < userList.size();i++) // 남아있는 TO는 시민 행
        {
            jobNameList.add("시민");
        }
        Collections.shuffle(jobNameList); // 유저 직업 스왑

        for (String jobState: // 직업 가짓 수 만큼 루프
                jobNameList) {
            User user = userList.get(index);
            user.setIngame_Job(jobRepository.findByName(jobState)); // 랜덤으로 설정된 직업들을 유저데이터에 삽입
            userList.set(index,user);
            index++;
        }
        userRepository.saveAll(userList);

        game_roomStateRepository.save(roomState);
        gameRoomRepository.save(room);

        //각 유저들에게 직업 할당
        schedulerService.addSchedule(roomId, getGameRoomState(roomId));

        return true;
    }
    @Transactional
    public Game_roomState getGameRoomState(Long roomId) throws Exception{
        return gameRoomRepository.findById(roomId).orElseThrow(() -> new Exception("[GAMEROOM] ID IS INVALID ")).getRoomState();
        //방 생성시에 state도 생성되어야함.
    }

    public Game_room GameRoomFindBySubject(String subject) {
        Game_room newRoom = gameRoomRepository.findBySubject(subject).orElse(createRoom(subject));

        return newRoom;

    }
}
