package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;
import com.lec.spring.repository.AuthorityRepository;
import com.lec.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorityRepository authorityRepository;


    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username.toUpperCase());
    }

    @Override
    public User findById(Long id) {
        User user = findById(id);
        return user;
    }


    @Override
    public int register(User user) {

//        // 회원 정보 저장
//        user.setUsername(user.getUsername().toUpperCase());
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//
//        // MEMBER 권한 기본적으로 부여
//        Authority auth = authorityRepository.findByName("MEMBER");
//        user.addAuthority(auth);
//        userRepository.save(user);

        return 1;
    }

    @Override
    public List<Authority> selectAuthById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null)
            return user.getAuthorities();

        return new ArrayList<>();

    }

    // 마이페이지 - 프로필 보기, 프로필 수정
    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    // 관리자페이지 - 유저 불러오기, 유저 상태, 게임머니 변경
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User updateUserInfo(User user) {
        User userEntity = userRepository.findById(user.getId()).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));

        userEntity.setAuthorities(user.getAuthorities());   // 유저 권한 변경
        userEntity.setGamemoney(user.getGamemoney());   // 유저 게임머니 변경

        return userEntity;
    }


}

