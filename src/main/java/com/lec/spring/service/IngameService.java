package com.lec.spring.service;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.domain.*;
import com.lec.spring.repository.*;
import com.lec.spring.utill.senderClass;
import io.jsonwebtoken.impl.DefaultHeader;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Consumer;

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
    private Game_JobDataRepository jobRepository;
    @Autowired
    private Game_voteRepository game_voteRepository;
    @Autowired
    private SchedulerService schedulerService;


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

        System.out.println("CONNECTROOM_START========\n\n\n===========");
        User connectedUser = userRepository.findById(userId).orElseThrow();

        Game_room connectRoom = GameRoomFindBySubject(roomName);

        if(connectRoom.getUserList().isEmpty()){
            connectRoom.setOwner_id(connectedUser.getId());
        }
        List<User> userList = connectRoom.getUserList();

        connectedUser.setRoom(connectRoom);

        gameRoomRepository.save(connectRoom);
        userRepository.save(connectedUser);

        System.out.println("CONNECTROOM_END========\n\n\n===========");
        return connectRoom;
    }


    @Transactional
    public List<defaultDTO> getUserList(Long roomId) throws Exception{


        Game_room findRoom = gameRoomRepository.findById(roomId).orElseThrow(() -> new Exception("ROOM ID IS INVALID "));


        List<defaultDTO> userList = findRoom.getUserListDTO();
        userList.sort(Comparator.comparing(o -> ((IngameUserRequestDTO) o)));
        return userList;
    }
    public Game_room createRoom(String subject){

        Game_room newRoom = createGameRoom();
        newRoom.setSubject(subject);

        //newRoom.setRoomState(newState);
        return newRoom;
    }
    @Transactional
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
    public boolean votePlayer(senderClass sender) {

        User voter =  userRepository.findById(Long.parseLong(sender.getSender())).orElseThrow();
        User elector = userRepository.findById(Long.parseLong(sender.getData())).orElseThrow();
        Game_roomState currentState = game_roomStateRepository.findTop1ByRoomOrderByIdDesc(gameRoomRepository.findById(sender.getRoomId()).orElseThrow());

        List<Game_vote> VoterLog = game_voteRepository.findByGameRoomState(currentState);

        for(int i = 0 ; i < VoterLog.size();i++) {
            Game_vote vote = VoterLog.get(i);
            if(vote.getVoter() == voter && // 보낸 사람이 일치하는지
                    vote.getRoundCount() == currentState.getRoundCount() && //라운드가 일치 하는지
                    vote.getRoundState() == currentState.getRoundStateProgress()) {// 라운드의 상태가 일치 하는지 
                // 모두 일치한다면 해당 투표는 무효표입니다. (다중투표)
                return false;
            }
        }

        
        //새 투표지 생성
        Game_vote newVote = Game_vote.builder().
                voter(voter).
                elector(elector).
                gameRoomState(currentState).
                roundCount(currentState.getRoundCount()).
                roundState(currentState.getRoundStateProgress()).
                build();
        game_voteRepository.save(newVote);
        return false;
    }
    @Transactional
    public boolean gameStart(Long roomId) throws Exception {
        Game_room room = gameRoomRepository.findById(roomId).orElseGet(null);
        Game_roomState currentState = game_roomStateRepository.findTop1ByRoomOrderByIdDesc(room);
        if(room == null) return false; // 방 없는데요
        
        if(room.getUserList().size() < 4) // 유저수 미만
                return false;
        if(currentState != null && currentState.isActive()) return false; // 이미 진행중인 방입니당.

        Game_roomState roomState = SetupSchedulerFunction(new Game_roomState().initData());


        roomState.setRoom(room);

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
            user.setIngame_status(0L);
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

        return game_roomStateRepository.findTop1ByRoomOrderByIdDesc(gameRoomRepository.findById(roomId).orElseThrow());
        //방 생성시에 state도 생성되어야함.
    }

    public Game_room GameRoomFindBySubject(String subject) {
        Game_room newRoom = gameRoomRepository.findBySubject(subject);

        if(newRoom == null)
            newRoom =createRoom(subject);

        return newRoom;

    }

    public void acceptUserList(Long roomId, Consumer<IngameUserRequestDTO> iConsumer) throws Exception {
        List<defaultDTO> userList = getUserList(roomId); // 유저들에게 각 직업 할당
        for(defaultDTO userDTO : userList) {
            iConsumer.accept((IngameUserRequestDTO) userDTO);
        }
    }

    // 게임룸 가져오기
    @Transactional(readOnly = true)
    public List<Game_room> findAll() {
        return gameRoomRepository.findAll();
    }
    @Transactional
    public Game_roomState SetupSchedulerFunction(Game_roomState state) {
        state.setBiScheduler((msg, repo) -> {
            msg.convertAndSend("sub/room/tick/" + state.getRoom().getId(), state.getCurrentDelayCount());
            if(state.DecreaseCurrentDelayCount()) {

                Game_room room = gameRoomRepository.findById(state.getRoom().getId()).orElseThrow();

                //이번에 투표된 모든 투표들 가져오기 (STATE, ROUNDCOUNT, ROUNDSTATE)
                List<Game_vote> voteList = game_voteRepository.findByGameRoomStateAndRoundCountAndRoundState(state, state.getRoundCount(),state.getRoundStateProgress() - 1);

                // 개표
                if(voteList.size() > 0)
                {
                    switch (state.RequiredVotes()){
                        case VOTE -> {
                            Map<User, Integer > voteCount = new HashMap<User, Integer>() ;
                            for (Game_vote v : voteList) {
                                int count = voteCount.containsKey(v.getElector()) ? (voteCount.get(v.getElector()) + 1) : 1;
                                voteCount.put(v.getElector(),count);
                            }

                            List<User> keySet = new ArrayList<>(voteCount.keySet());
                            keySet.sort(Comparator.comparing(voteCount::get).reversed());
                            User elect = keySet.get(0);

                            boolean voteInvalid = false;

                            if(keySet.size() > 1) {
                                voteInvalid = voteCount.get(keySet.get(0)) == voteCount.get(keySet.get(1));
                            }
                            if(!voteInvalid) {
                                elect.setIngame_status(1L);
                                msg.convertAndSend("sub/room/dead/" + elect.getId(), true);
                                userRepository.save(elect);
                            }
                        }
                        case NIGHT -> {
                            Map<User, List<Game_vote>> effects = new HashMap<>();
                            for (Game_vote v : voteList) {
                                if(!effects.containsKey(v.getElector())){
                                    effects.put(v.getElector(),new ArrayList<>());
                                }//.getVoter().getIngame_Job().getEffectType()
                                effects.get(v.getElector()).add(v);
                            } // 직업 능력 저장
                            effects.forEach((key, value)-> {
                                Map<String,User> checked = new HashMap<>();
                                value.forEach((v)-> checked.put(v.getVoter().getIngame_Job().getEffectType(),v.getVoter()));

                                if(checked.containsKey("KILL") &&
                                        !checked.containsKey("HEAL")) {
                                    msg.convertAndSend("sub/room/dead/" + key.getId(), true);

                                }
                                if(checked.containsKey("SEARCH")){
                                    msg.convertAndSend("sub/room/search/" + checked.get("SEARCH").getId(),new IngameUserRequestDTO().toDTO(key));
                                }
                            });

                        }
                    }
                }



                state.IncreaseRoundState();

                msg.convertAndSend("sub/room/roundState/" + room.getId(), state.getCurrentStateString());

                room.getUserList().forEach((user) -> {

                    boolean isVote = (state.getRoundStateProgress() == 3 || // 투표시간
                            (user.getIngame_Job().isNightVote() && state.getRoundStateProgress() == 5)) && //  밤 행동 가능한데 밤시간
                            user.getIngame_status() == 0; //사망 여부
                    
                    //투표 여부
                    msg.convertAndSend("sub/room/isVoteState/" + user.getId(), isVote);
                });
                repo.save(state);
            }

        });
        return state;
    }
}
