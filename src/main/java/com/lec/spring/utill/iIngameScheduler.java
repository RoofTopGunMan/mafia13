package com.lec.spring.utill;

import com.lec.spring.repository.Game_roomStateRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

public interface iIngameScheduler {

    void SchedulerUpdate(SimpMessageSendingOperations msgOp, JpaRepository stateRepository);

}
