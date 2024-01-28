package com.lec.spring.utill;

import org.springframework.messaging.simp.SimpMessageSendingOperations;

public interface iIngameScheduler {

    void SchedulerUpdate(SimpMessageSendingOperations msgOp);

}
