package com.lec.spring.repository;

import com.lec.spring.domain.Game_jobData;
import com.lec.spring.domain.Game_room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Game_JobDataRepository extends JpaRepository<Game_jobData,Long> {

    Game_jobData findByName(String title);
}
