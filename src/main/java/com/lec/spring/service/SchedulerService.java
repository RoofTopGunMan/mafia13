package com.lec.spring.service;

import com.lec.spring.utill.iIngameScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SchedulerService {

    Set<iIngameScheduler> runningIngame = new HashSet<>();
    @Scheduled(fixedDelay = 1000) // 1sec
    public void runTest()
    {
        runningIngame.iterator().forEachRemaining(Scheduler -> {
            Scheduler.SchedulerUpdate();
        });
        //게임시간 관리용 틱
    }
    public void addSchedule(iIngameScheduler scheduler){
        runningIngame.add(scheduler);
    }
    public void removeSchedule(iIngameScheduler scheduler) {
        runningIngame.remove(scheduler);
    }






}
