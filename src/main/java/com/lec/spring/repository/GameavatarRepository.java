package com.lec.spring.repository;

import com.lec.spring.domain.Gameavatar;
import com.lec.spring.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GameavatarRepository extends JpaRepository<Gameavatar,Long> {
    List<Gameavatar> getByUserId(Long userId);
}
