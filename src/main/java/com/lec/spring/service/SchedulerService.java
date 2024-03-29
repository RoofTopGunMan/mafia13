package com.lec.spring.service;

import com.lec.spring.domain.Game_room;
import com.lec.spring.repository.Game_roomStateRepository;
import com.lec.spring.utill.iIngameScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class SchedulerService {

    Map<Long,iIngameScheduler> runningIngame;
    private final SimpMessageSendingOperations msgOp;

    @Autowired
    private Game_roomStateRepository stateRepo;

    public SchedulerService(SimpMessageSendingOperations messagingTemplate) {
        this.msgOp = messagingTemplate;
        runningIngame = new HashMap<>();
    }

    @Scheduled(fixedDelay = 100) // 1sec
    @Transactional
    public void runTest()
    {
        runningIngame.forEach((key, value)->{
            value.SchedulerUpdate(msgOp, stateRepo);
        });
        //게임시간 관리용 틱
    }
    public void addSchedule(Long roomId, iIngameScheduler scheduler){
        if(!runningIngame.containsKey(roomId))
            System.out.println("게임 방 실행 : " + runningIngame.put(roomId, scheduler));
    }
    public void removeSchedule(Long roomId) {
        runningIngame.remove(roomId);
    }






}
