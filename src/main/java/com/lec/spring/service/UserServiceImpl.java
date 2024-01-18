package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;
import com.lec.spring.repository.AuthorityRepository;
import com.lec.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        // 회원 정보 저장
        user.setUsername(user.getUsername().toUpperCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // MEMBER 권한 기본적으로 부여
        Authority auth = authorityRepository.findByName("MEMBER");
        user.addAuthority(auth);
        userRepository.save(user);

        return 1;
    }

    @Override
    public List<Authority> selectAuthById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null)
            return user.getAuthorities();

        return new ArrayList<>();

    }
}

