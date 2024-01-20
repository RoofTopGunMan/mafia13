package com.lec.spring.controller;

import com.lec.spring.domain.Game_room;
import com.lec.spring.repository.Game_roomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @Autowired
    private Game_roomRepository roomRepository;
    @GetMapping("/api/hello")
    public String test(){
        return "TestString";
    }
    @GetMapping("api/button")
    public boolean buttonCtrl(boolean debug){

        return debug;
    }
}
