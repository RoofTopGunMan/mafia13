package com.lec.spring.controller;

import com.lec.spring.domain.LoginResponse;
import com.lec.spring.domain.User;
import com.lec.spring.service.LoginService;
import com.lec.spring.service.UserService;
import com.lec.spring.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    private TokenService tokenService;

    @GetMapping("/login")
    public void login(){}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User authenticatedUser = loginService.login(loginUser.getUsername(), loginUser.getPassword());

        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid username or password");
        }

        String token = tokenService.generateToken(authenticatedUser);
        return ResponseEntity.ok(new LoginResponse(token, authenticatedUser));
    }


    @GetMapping("/register")
    public void register(){}


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User savedUser = loginService.register(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/user/**").allowedOrigins("http://localhost:3000");
            }
        };
    }



}







