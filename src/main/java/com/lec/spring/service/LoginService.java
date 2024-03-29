package com.lec.spring.service;

import com.lec.spring.config.AuthenticationException;
import com.lec.spring.domain.Game_jobData;
import com.lec.spring.domain.Gameavatar;
import com.lec.spring.domain.User;
import com.lec.spring.repository.Game_JobDataRepository;
import com.lec.spring.repository.GameavatarRepository;
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
    @Autowired
    private GameavatarRepository gameavatarRepository;

    @Autowired
    private Game_JobDataRepository gameJobDataRepository;
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

        user.setIngame_Job(gameJobDataRepository.findByName("시민"));

        // 게임 아바타 생성 및 초기값 설정
        Gameavatar gameAvatar = new Gameavatar();
        gameAvatar.setHead(0);
        gameAvatar.setOutline(0);
        gameAvatar.setCloak(0);
        gameAvatar.setUser(userRepository.save(user));



        // 게임 아바타 저장
        gameavatarRepository.save(gameAvatar);

        return userRepository.save(user);
    }
}
