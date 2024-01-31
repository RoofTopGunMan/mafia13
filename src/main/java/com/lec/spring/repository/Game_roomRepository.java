package com.lec.spring.repository;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.Game_roomJobState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface Game_roomRepository extends JpaRepository<Game_room,Long> {
    Game_room findBySubject(String title);
    Optional<Game_room> findByIdOrderByUpdatedAtDesc(Long id);


    @Query("SELECT distinct t FROM Game_room t join fetch t.userList")
    public List<Game_room> findAllRoomStateUsingFetchJoin();
}
