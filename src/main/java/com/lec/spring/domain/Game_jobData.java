package com.lec.spring.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


/* 인게임에서 사용 될 직업의 데이터입니다.
 * 해당 데이터의 수정은 서버 비즈니스 로직에 포함되지 않으며 일전에 설정된 DB값만 가져옵니다.
 */
@Entity
@NoArgsConstructor
@Data
public class Game_jobData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private boolean nightVote;
    private boolean selfVote;

    private String effectType;

}
