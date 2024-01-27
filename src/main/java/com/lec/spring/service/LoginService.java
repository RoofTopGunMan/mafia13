package com.lec.spring.service;

import com.lec.spring.config.AuthenticationException;
import com.lec.spring.domain.User;
import com.lec.spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }


    @Transactional
    public User login(String username, String rawPassword) {

        if (StringUtils.isBlank(username) || StringUtils.isBlank(rawPassword)) {
            throw new AuthenticationException("아이디 및 비밀번호는 필수 입력 사항입니다.");
        }

        System.out.println(rawPassword);

        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        throw new AuthenticationException("Invalid username or password");
    }

    @Transactional
    public User register(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }
}
