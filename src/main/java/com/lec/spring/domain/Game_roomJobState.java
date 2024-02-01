package com.lec.spring.domain;


import jakarta.persistence.*;
import lombok.*;


/* 게임방과 직업을 연결해줄 테이블입니다.
 * 해당 테이블은 Game_room와 N:1 관계를 가지며 해당하는 Game_room에서 현재 직업들의 사용 가능 개수를 정의합니다.
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Game_roomJobState extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int jobCount;


    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "Game_jobData_id")
    private Game_jobData jobData;


    @ManyToOne
    @JoinColumn(name = "game_room_id")
    private Game_room room;

}
