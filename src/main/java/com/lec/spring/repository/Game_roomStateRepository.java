package com.lec.spring.repository;

import com.lec.spring.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Game_roomStateRepository extends JpaRepository<Game_roomState,Long> {

    Game_roomState findByRoom(Game_room room);
    Game_roomState findTop1ByRoomOrderByIdDesc(Game_room room);
}
