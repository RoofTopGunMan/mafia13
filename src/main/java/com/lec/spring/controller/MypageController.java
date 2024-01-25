package com.lec.spring.controller;

import com.lec.spring.domain.Gameavatar;
import com.lec.spring.service.GameavatarService;
import com.lec.spring.service.ItemService;
import com.lec.spring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MypageController {
    @Autowired
    private UserService userService;
    @Autowired
    private GameavatarService gameavatarService;

    @Autowired
    private ItemService itemService;
    @GetMapping("/mypage")
    @CrossOrigin
    public ResponseEntity<?> home(){
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }


    @GetMapping("/mypage/{id}")
    @CrossOrigin
    public ResponseEntity<?>  getUserById(@PathVariable Long id){
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
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

    // 유저 인벤토리 아이템 항목
    @GetMapping("/mypage/inventory/item/{userId}")
    @CrossOrigin
    public ResponseEntity<?>  getByItemuserId(@PathVariable Long userId){
        return new ResponseEntity<>(itemService.getByuserId(userId), HttpStatus.OK);
    }

    // 유저 게임 아바타
    @GetMapping("/mypage/inventory/gameavatar/{userId}")
    @CrossOrigin
    public ResponseEntity<?>  getByAvataruserId(@PathVariable Long userId){
        return new ResponseEntity<>(gameavatarService.getByuserId(userId), HttpStatus.OK);
    }






}
