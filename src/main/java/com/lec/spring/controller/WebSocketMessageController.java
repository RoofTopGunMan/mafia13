package com.lec.spring.controller;

import com.lec.spring.utill.senderClass;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.io.Console;


@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {
    private senderClass sender;

    @MessageMapping("/subTest")
    public void chatTest(senderClass sender)
    {
        System.out.println("test");
        this.sender = sender;
        System.out.println(sender);
    }
}
