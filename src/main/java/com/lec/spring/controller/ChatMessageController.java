package com.lec.spring.controller;

import com.lec.spring.domain.ChatMessage;
import com.lec.spring.domain.User;
import com.lec.spring.repository.ChatMessageRepository;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.service.ChatService;
import com.lec.spring.utill.senderClass;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    ChatService chatService;

    @MessageMapping("chatRoom")
    public void sendChat(senderClass sender) {

        String desc = chatService.getDestination(sender.getRoomId());

        chatService.saveChatLog(sender);
        // 클라에 데이터 안넘기기
        sender.setUserId(0L);
        sender.setRoomId(0L);
        messagingTemplate.convertAndSend(desc,sender);

    }
    @MessageMapping("chatEntrance")
    public void entranceChat(senderClass sender){

    }
}
