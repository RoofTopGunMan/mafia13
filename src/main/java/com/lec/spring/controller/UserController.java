package com.lec.spring.controller;

import com.lec.spring.domain.User;
import com.lec.spring.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public void login(Model model){}


    @PostMapping("/login")
    public void loginProcess(){

    }

    @PostMapping("/loginError")
    public String loginError(){
        return "user/login";
    }

    @RequestMapping("/rejectAuth")
    public String rejectAuth(){
        return "common/rejectAuth";
    }

    @GetMapping("/register")
    public void register(){}


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        int userInfo = userService.register(user);
        return ResponseEntity.ok(userInfo);
    }

//    @Autowired
//    UserValidator userValidator;
//
//    @InitBinder
//    public void intiBinder(WebDataBinder binder) {
//        binder.setValidator(userValidator);
//    }


}







