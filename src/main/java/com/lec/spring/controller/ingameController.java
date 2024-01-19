package com.lec.spring.controller;


import com.lec.spring.domain.User;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.service.DevelopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ingameController {

    @Autowired
    DevelopService developService;
    @GetMapping("api/getuser")
    public ResponseEntity getUserData(Long userId) throws Exception {
        return new ResponseEntity(developService.UserFindById(userId), HttpStatus.OK);
    }


}
