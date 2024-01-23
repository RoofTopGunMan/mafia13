package com.lec.spring.domain;

import com.lec.spring.utill.iIngameScheduler;
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
public class Game_roomState extends BaseEntity implements iIngameScheduler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //현재 라운드 진행상황입니다. 1회 순환 시 카운트가 올라갑니다.
    private int roundCount;

    /* 현재 라운드의 상태가 어떤 상황인지 저장합니다.
     * 0 : 시작 전, 1 : 낮, 2 : 투표, 3 : 밤, 4 : 구간대기, 5 : 게임종료 시간입니다.
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



    //db에 저장되지 않는 현재 시간 값입니다.
    @Transient
    private int currentDelayCount;

    //db에 저장되지 않는 현재 대기시간 여부입니다.
    //true일 경우 다음 상태로 넘어갑니다.
    @Transient
    private boolean isWaitTimer;

    final int STATICDELAYCOUNT = 3;
    final int STATICSTARTCOUNT = 8;

    // 게임 방과 1:1 관계입니다.
    // 실제 게임 진행시엔 해당 테이블만 변경됩니다.
    @OneToOne(optional = false)
    private Game_room room;


    public Game_roomState startGame(){
        isActive = true; // 게임 시작

        currentPlayerCount = room.getUserList().size();
        livedPlayerCount = currentPlayerCount;
        roundStateProgress = 0;
        roundCount = 0;
        isWaitTimer = true;
        voteUserCount = 0;
        currentDelayCount = 8; // 게임 시작 전 고정 딜레이 시간 값입니다.
        return this;
    }


    @Override
    public void SchedulerUpdate() {
        currentDelayCount--;

        if(currentDelayCount <= 0) {
            currentDelayCount = isWaitTimer ? currentDelayCount : STATICDELAYCOUNT;

            switch (roundStateProgress){
                case 0: // 현재 상태가 게임 시작 전 일경우
                {
                    
                }
                break;

                case 1: // 낮
                {

                }
                break;

                case 2: // 투표
                {

                }
                break;

                case 3: // 밤
                {

                }
                break;
            }


        }

    }
}
