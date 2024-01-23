package com.lec.spring.controller;

import com.lec.spring.domain.Gameavatar;
import com.lec.spring.service.GameavatarService;
import com.lec.spring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MypageController {

    private UserService userService;

    private GameavatarService gameavatarService;
    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<?> home(){
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }


    @GetMapping("/mypage")
    @CrossOrigin
    public ResponseEntity<?> findUsername(@PathVariable String username){
        return new ResponseEntity<>(userService.findByUsername(username), HttpStatus.OK);
    }


    @GetMapping("/mypage/inventory")
    @CrossOrigin
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(gameavatarService.findAll(), HttpStatus.OK);
    }


    @PostMapping("/mypage/inventory")
    @CrossOrigin
    public ResponseEntity<?> save(@RequestBody Gameavatar gameavatar){
        return  new ResponseEntity<>(gameavatarService.save(gameavatar), HttpStatus.CREATED);
    }



}
