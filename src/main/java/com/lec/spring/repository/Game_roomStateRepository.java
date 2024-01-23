package com.lec.spring.repository;

import com.lec.spring.domain.Game_room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Game_roomStateRepository extends JpaRepository<Game_room,Long> {
}
