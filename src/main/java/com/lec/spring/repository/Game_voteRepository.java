package com.lec.spring.repository;

import com.lec.spring.domain.Game_vote;
import com.lec.spring.domain.Game_roomState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Game_voteRepository extends JpaRepository<Game_vote, Long> {
    //List<Game_vote> findByVoter(Long voterId);
    List<Game_vote> findByGameRoomState(Game_roomState gameRoomState);
    //List<Game_vote> findByElector(Long electorId);


}
