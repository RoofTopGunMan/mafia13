package com.lec.spring.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; //회원 아이디

    @Column(nullable = false)
    @JsonIgnore
    private String password; // 회원 비밀번호

    @Column(nullable = false)
    private String name; // 회원 이름

    @Column(nullable = false, unique = true)
    @JsonIgnore
    private String email; // 이메일


    @Column(nullable = false)
    private Long gamemoney;

    @PrePersist
    @PreUpdate
    private void prePersistPreUpdate() {
        if (gamemoney == null) {
            gamemoney = 0L;
        }
    }
    @ManyToOne
    @JoinColumn(name = "game_room_id")
    private Game_room room;

    private Long ingame_status;

    // User : Authority / N:M 관계
    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    @JsonIgnore
    private List<Authority> authorities = new ArrayList<>();

    // User:Gameavatar = 1:1
    @OneToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    private Gameavatar gameavatar;   // 게임 아바타





    public void addAuthority(Authority...authorities) {
        Collections.addAll(this.authorities,authorities);
    }
}
