package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;

import java.util.List;

public interface UserService {

    User findByUsername(String username);

    User findById (Long id);

    int register(User user);

    List<Authority> selectAuthById(Long id);


    // 마이페이지 - 프로필 보기, 프로필 수정, 판매물품
    User getUserByUsername(String username);
    User getUserById(Long id);



}
