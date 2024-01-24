package com.lec.spring.controller;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.Game_roomState;
import com.lec.spring.service.IngameService;
import com.lec.spring.service.SchedulerService;
import com.lec.spring.utill.senderClass;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.Console;
import java.util.List;


@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {
    private senderClass sender;

    @Autowired
    private IngameService ingameService;
    private final SimpMessageSendingOperations messagingTemplate;
    @Autowired
    private SchedulerService schedulerService;

    @MessageMapping("/subTest")
    public void chatTest(senderClass sender)
    {
        this.sender = sender;
        System.out.println(sender);
    }

    @MessageMapping("/entrance")
    public void roomEntrance(senderClass sender) throws Exception {

        this.sender = sender;
        List<defaultDTO> userList = ingameService.FindByUserListFromRoomId((long) sender.getRoomId());
        messagingTemplate.convertAndSend("sub/room/entrance/" + sender.getRoomId(), userList);
    }
    @MessageMapping("/Play")
    public void playGame(senderClass sender) throws Exception {
        //플레이어들에게 게임 시작 발행

        this.sender = sender;
        if(!ingameService.gameStart(sender.getRoomId())) {
            return;
        }
        messagingTemplate.convertAndSend("sub/room/Play/" + sender.getRoomId(),2);
        messagingTemplate.convertAndSend("sub/" + sender.getRoomId(),3);
        //s

    }
    @MessageMapping("/exit")
    public void roomExit(senderClass sender) throws Exception {

        this.sender = sender;
        List<defaultDTO> userList = ingameService.FindByUserListFromRoomId((long) sender.getRoomId());
        messagingTemplate.convertAndSend("sub/room/entrance/" + sender.getRoomId(),userList);
    }
}
