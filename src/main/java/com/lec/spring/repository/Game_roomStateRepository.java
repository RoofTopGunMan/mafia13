package com.lec.spring.repository;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.Game_roomState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Game_roomStateRepository extends JpaRepository<Game_roomState,Long> {
}
