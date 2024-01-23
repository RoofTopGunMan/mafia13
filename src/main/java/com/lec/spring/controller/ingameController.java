package com.lec.spring.controller;


import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.Game_roomState;
import com.lec.spring.service.DevelopService;
import com.lec.spring.service.IngameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ingameController {

    @Autowired
    DevelopService developService;

    @Autowired
    IngameService ingameService;
    @GetMapping("api/getuser")
    public ResponseEntity getUserData(Long userId) throws Exception {
        return new ResponseEntity(developService.UserFindById(userId), HttpStatus.OK);
    }

    @GetMapping("api/getRoomInUser")
    public ResponseEntity getUserList(long roomId) throws Exception {
        return new ResponseEntity(ingameService.FindByUserListFromRoomId(roomId),HttpStatus.OK);
    }



}
