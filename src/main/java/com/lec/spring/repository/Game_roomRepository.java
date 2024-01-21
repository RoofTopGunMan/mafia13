package com.lec.spring.repository;

import com.lec.spring.domain.Game_room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Game_roomRepository extends JpaRepository<Game_room,Long> {
    Optional<Game_room> findBySubject(String title);
    Optional<Game_room> findByIdOrderByUpdateAtDesc(Long id);
}
