package com.lec.spring.controller;


import com.lec.spring.domain.User;
import com.lec.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ingameController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("api/getuser")
    public User getUserData(Long userId) throws Exception {
        User resultUser = userRepository.findById(userId).orElseThrow(()->  new Exception("Miss Match ID"));

;        return resultUser;
    }


}
