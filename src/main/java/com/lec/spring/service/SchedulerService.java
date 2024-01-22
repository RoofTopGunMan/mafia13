package com.lec.spring.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    @Scheduled(fixedDelay = 1000) // 1sec
    public void runTest()
    {
        //게임시간 관리용 틱
    }


}
