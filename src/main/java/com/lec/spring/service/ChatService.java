package com.lec.spring.service;

import com.lec.spring.domain.ChatMessage;
import com.lec.spring.domain.User;
import com.lec.spring.repository.ChatMessageRepository;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.utill.senderClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatMessageRepository chatMessageRepository;
    public boolean connectLobbyRoom(){
        return false;
    }

    public boolean connectGameChat() {
        return false;
    }

    public String getDestination(Long roomId) {
        String desc;
        // 로비
        if(roomId == -1)
        {
            desc = "sub/lobby/chat";

        }
        else {
            desc = "sub/room/chat/" + roomId;
        }
        return desc;

    }
    public boolean saveChatLog(senderClass sender ) {

        User user = userRepository.findById(sender.getUserId()).orElseThrow();

        ChatMessage message = ChatMessage.builder().message(sender.getData()).sender(user).build();

        chatMessageRepository.save(message);
        return false;
    }


}
