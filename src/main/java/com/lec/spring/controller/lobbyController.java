package com.lec.spring.controller;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import com.lec.spring.repository.Game_roomRepository;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.service.DevelopService;
import com.lec.spring.service.IngameService;
import com.lec.spring.service.UserService;
import com.lec.spring.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class lobbyController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private Game_roomRepository roomRepository;

    @Autowired
    private IngameService ingameService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("api/room/connect")
    public Game_room connectedRoom(long userId, String roomName) throws Exception {
        //방 입장
        return ingameService.connectRoom(userId,roomName);
    }

    // 로비에 방 가져오기
    @GetMapping("/lobby/gameroom")
    @CrossOrigin
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(ingameService.findAll(), HttpStatus.OK); // 200
    }

    // 로비에 공지 가져오기
    @GetMapping("/lobby/notice")
    @CrossOrigin
    public ResponseEntity<?> notice(){
        return new ResponseEntity<>(noticeService.loadNoticeAtHome(), HttpStatus.OK); // 200
    }

}
