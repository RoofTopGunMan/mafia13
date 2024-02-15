package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;

import java.util.List;

public interface UserService {

    User findByUsername(String username);

    User findById (Long id);

    int register(User user);

    List<Authority> selectAuthById(Long id);


    // 마이페이지 - 프로필 보기, 프로필 수정,
    User getUserById(Long id);

    User updateUser(User user);

    // 관리자 페이지 - 모든 유저 불러오기, 유저 상태, 게임머니 변경
    List<User> findAll();

    User updateUserInfo(User user);

}
