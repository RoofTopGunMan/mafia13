package com.lec.spring.service;

import com.lec.spring.domain.User;
import com.lec.spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

//    public User login(User userLogin){
//        Optional<User> userInfo = userRepository.findByUsername(userLogin.getUsername());
//
//        if (!userInfo.isPresent()) {
//            throw new RuntimeException("존재하지 않는 아이디입니다.");
//        }
//
//        User user = userInfo.get();
//
//        if (!userInfo.getPassword().equals(user.getPassword())) {
//            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
//        }
//
//        return user;
//    }

    @Transactional
    public User register(User user) {
        return userRepository.save(user);
    }
}
