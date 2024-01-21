package com.lec.spring.controller;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.service.IngameService;
import com.lec.spring.utill.senderClass;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.io.Console;
import java.util.List;


@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {
    private senderClass sender;

    @Autowired
    private IngameService ingameService;
    private final SimpMessageSendingOperations messagingTemplate;

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
        messagingTemplate.convertAndSend("sub/room/entrance/" + sender.getRoomId(),userList);

    }
}
