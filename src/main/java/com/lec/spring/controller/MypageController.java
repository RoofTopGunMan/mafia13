package com.lec.spring.controller;

import com.lec.spring.domain.User;
import com.lec.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/mafia")
public class MypageController {

    @Autowired
    private UserService userService;


    @GetMapping("/mypage/home")
    public String showMyPage(Model model, Principal principal) {
        String currentUsername = principal.getName();
        User userProfile = userService.getUserByUsername(currentUsername);
        model.addAttribute("userProfile", userProfile);
        model.addAttribute("containerRightPage", "/mypage/view");

        return "mypage/home";
    }

    @GetMapping("/mypage/view")
    public String showViewPage(Model model, Principal principal) {
        String currentUsername = principal.getName();
        User userProfile = userService.getUserByUsername(currentUsername);
        model.addAttribute("userProfile", userProfile);

        return "mypage/view";
    }

}
