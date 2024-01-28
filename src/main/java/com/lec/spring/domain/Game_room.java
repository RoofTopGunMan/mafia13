package com.lec.spring.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.DTO.IngameUserRequestDTO;
import com.lec.spring.DTO.defaultDTO;
import com.lec.spring.utill.iIngameScheduler;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.util.ArrayList;
import java.util.List;

/* 게임방 도메인입니다
 * 게임 방 및 인게임 관련 컬럼을 다룹니다.
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString(callSuper = true)
@Builder
@EqualsAndHashCode(callSuper = true)
public class Game_room extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //각 진행도 별 시간입니다.
    private int time;

    //로비에 노출 될 게임 방의 제목입니다.
    private String subject;

    // 최대 플레이어의 수 입니다.
    private int max_player;

    //현재 게임 방이 비밀방상태인지 여부입니다.
    private boolean isLocked;
    private String game_password;
    private int room_num;

    //현재 게임 방 상태를 정의하는 상태 값 입니다.
    // 0 : 게임 방 제거      delete동작을 하지 않은 채 로비에서 비활성화된 상태입니다. 모든 플레이어가 해당 게임 방을 나갈 경우 해당 상태로 변환되어야 합니다.
    // 1 : 게임 방 활성화    로비에서 검색 가능하며 플레이어의 참여가 가능한 상태입니다.
    // 2 : 게임 방 진행 중   게임이 진행중인 상태로 플레이어의 참여가 불가능한 상태입니다.
    private int state;

    //방장 Id입니다. user의 id를 가져옵니다.
    private Long owner_id;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "room", cascade = CascadeType.PERSIST)
    @ToString.Exclude
    @JsonIgnore
    private Game_roomState roomState; //진행중인 게임 방의 인 게임 상태입니다.

    @OneToMany(mappedBy ="room", fetch = FetchType.EAGER)
    @Builder.Default
    @JsonIgnore
    private List<User> userList = new ArrayList<>();

    public void addUser(User user)
    {
        this.userList.add(user);
    }
    public List<defaultDTO> getUserListDTO() {
        List<defaultDTO> newList;
        newList = new ArrayList<>();
        for (User u:
             userList) {
            newList.add(new IngameUserRequestDTO().toDTO(u,u.getId() == owner_id));

        }
        return newList;
    }


    // 게임 방 내 직업의 수 입니다.
    // job_data에 있는 모든 컬럼을 추가 하며, 방장의 설정 값에 따라 (0 - 현재 플레이어의 절반)의 숫자를 설정합니다.
    @OneToMany(mappedBy ="room", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Game_roomJobState> jobState = new ArrayList<>();

    //https://soojong.tistory.com/entry/JPA-ManyToOne-OneToMany-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0



}
