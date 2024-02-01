package com.lec.spring.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
    private String password; // 회원 비밀번호

    @Column(nullable = false)
    private String name; // 회원 이름

    @Column(nullable = false, unique = true)
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_room_id")
    @JsonIgnore
    private Game_room room;

    @Column(nullable = false)
    @ColumnDefault(value = "0")
    private Long ingame_status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingame_Job_id",referencedColumnName = "id")
    @ToString.Exclude
    @JsonIgnore
    private Game_jobData ingame_Job;

    @ColumnDefault(value = "0")
    private  int status; // 유저 상태




    // User : Authority / N:M 관계
    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    @JsonIgnore
    private List<Authority> authorities = new ArrayList<>();






    public void addAuthority(Authority...authorities) {
        Collections.addAll(this.authorities,authorities);
    }
}
