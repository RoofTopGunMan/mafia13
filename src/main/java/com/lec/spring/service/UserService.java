package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;

import java.util.List;

public interface UserService {


    User findByUsername (String username);
    User findById (Long id);

    int register(User user);

    List<Authority> selectAuthById(Long id);
}
