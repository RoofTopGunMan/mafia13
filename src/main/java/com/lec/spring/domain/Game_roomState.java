package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


/* 게임방 진행 시 해당 방의 상태 값을 가져오는 테이블입니다.
 * 해당 DB에 데이터가 변경됨에 따라 1:1로 연결 된 게임방의 현재 상태를 수정합니다.
 */
@Data
@NoArgsConstructor
@Entity
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Game_roomState extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //현재 라운드 진행상황입니다. 1회 순환 시 카운트가 올라갑니다.
    private int roundCount;

    /* 현재 라운드의 상태가 어떤 상황인지 저장합니다.
     * 0 : 낮, 1 : 투표, 2 : 밤 시간입니다.
     */
    private int roundStateProgress;


    /* 게임 방이 현재 진행중인지 여부입니다.
     * 해당 컬럼의 값이 false -> true로 변경 될 경우 내부의 모든 속성들이 초기화 되어야 합니다.
     */
    private boolean isActive;

    //현재 게임 내에 있는 플레이어의 수 입니다.
    private int currentPlayerCount;

    //현재 생존한 플레이어의 수 입니다.
    private int livedPlayerCount;

    //투표를 마친 플레이어의 수 입니다.
    private int voteUserCount;


    // 게임 방과 1:1 관계입니다.
    // 실제 게임 진행시엔 해당 테이블만 변경됩니다.
    @OneToOne(optional = false)
    private Game_room room;



}
