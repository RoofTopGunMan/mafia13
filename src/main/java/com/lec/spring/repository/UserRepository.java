package com.lec.spring.repository;

import com.lec.spring.domain.Notice;
import com.lec.spring.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    boolean existsByUsername(String username);

    // 최근에 가입한 유저 5명만 출력
    List<User> findTop5ByOrderByIdDesc();
}
