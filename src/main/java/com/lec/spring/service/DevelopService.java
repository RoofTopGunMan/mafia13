package com.lec.spring.service;



//개발 전용 서비스입니다.
//해당 서비스 내용은 다른 서비스로 이관되어야 합니다.

import com.lec.spring.domain.User;
import com.lec.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DevelopService {
    @Autowired
    private UserRepository userRepository;



    //유저에 들어가야하는 서비스 함수 입니다.
    public User UserFindById(Long userId) throws Exception {

        User resultUser = userRepository.findById(userId).orElseThrow(()->  new Exception("Miss Match ID"));
        return resultUser;
    }


}
