package com.lec.spring.controller;

import com.lec.spring.domain.Gameavatar;
import com.lec.spring.domain.User;
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

    // 유저 프로필 수정 삭제
    @PutMapping("/mypage")
    @CrossOrigin
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
    }



    // 유저 인벤토리 아이템 항목
    @GetMapping("/mypage/inventory/item/{userId}")
    @CrossOrigin
    public ResponseEntity<?>  getByItemuserId(@PathVariable Long userId){
        return new ResponseEntity<>(itemService.getByuserId(userId), HttpStatus.OK);
    }

//     유저 게임 아바타
    @GetMapping("/mypage/inventory/gameavatar/{userId}")
    @CrossOrigin
    public ResponseEntity<?>  getByAavataruserId(@PathVariable Long userId){
        return new ResponseEntity<>(gameavatarService.getByuserId(userId), HttpStatus.OK);
    }


    @PutMapping("/mypage/inventory/gameavatar")
    @CrossOrigin
    public ResponseEntity<?> updategameavatar(@RequestBody Gameavatar gameavatar){
        return new ResponseEntity<>(gameavatarService.updategameavatar(gameavatar), HttpStatus.OK);
    }


}
