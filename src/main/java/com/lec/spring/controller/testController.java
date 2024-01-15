package com.lec.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {
    @GetMapping("/api/hello")
    public String test(){
        return "TestString";
    }
    @GetMapping("api/button")
    public boolean buttonCtrl(boolean debug){
        return debug;
    }
}
