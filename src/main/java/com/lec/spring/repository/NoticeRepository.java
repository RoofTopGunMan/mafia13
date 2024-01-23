package com.lec.spring.repository;

import com.lec.spring.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    // 최근에 올라온 공지 5개만 출력
    List<Notice> findTop5ByOrderByIdDesc();
}
