package com.lec.spring.controller;

import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.service.IngameService;
import com.lec.spring.utill.senderClass;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {

    @Autowired
    private IngameService ingameService;
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/subTest")
    public void chatTest(senderClass sender)
    {
        System.out.println(sender);
    }

    //방 진입
    @MessageMapping("/entrance")
    public void roomEntrance(senderClass sender) throws Exception {

        List<defaultDTO> userList = ingameService.getUserList( sender.getRoomId()); // 현재 방에 접속한 유저 리스트 받아오기
        messagingTemplate.convertAndSend("sub/room/userId/" + sender.getUserId(), sender.getUserId()); // 현재 유저
        messagingTemplate.convertAndSend("sub/room/entrance/" + sender.getRoomId(), userList);
    }
    @MessageMapping("/Play")
    public void playGame(senderClass sender) throws Exception {
        //플레이어들에게 게임 시작 발행

        if(!ingameService.gameStart(sender.getRoomId())) {
            return;
        }
        List<defaultDTO> userList = ingameService.getUserList( sender.getRoomId()); // 유저들에게 각 직업 할당
        for(defaultDTO userDTO : userList) {
            IngameUserRequestDTO ingameDTO = (IngameUserRequestDTO) userDTO;
            messagingTemplate.convertAndSend("sub/room/userInfo/" + ingameDTO.getId(),userDTO);

        }


        messagingTemplate.convertAndSend("sub/room/Play/" + sender.getRoomId(),2);
        messagingTemplate.convertAndSend("sub/" + sender.getRoomId(),3);
        //s

    }
    @MessageMapping("/End")
    public void endGame(senderClass sender) throws Exception {
        //플레이어들에게 게임 시작 발행

        if(!ingameService.gameEnd(sender.getRoomId())) {
            return;
        }
        messagingTemplate.convertAndSend("sub/room/End/" + sender.getRoomId(),2);
        //s

    }
    @MessageMapping("/Vote")
    public void votePlayer(senderClass sender) {
        System.out.println("VOTE PLAYER");

        ingameService.votePlayer(sender);

    }
    @MessageMapping("/exit")
    public void roomExit(senderClass sender) throws Exception {

        List<defaultDTO> userList = ingameService.getUserList((long) sender.getRoomId());
        messagingTemplate.convertAndSend("sub/room/entrance/" + sender.getRoomId(),userList);
    }
}
