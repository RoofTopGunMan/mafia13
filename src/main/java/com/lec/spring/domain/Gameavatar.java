package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.ColumnDefault;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Gameavatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id; // PK


    @Column()
    private int head;

    @Column()
    private int cloak;

    @Column()
    private int outline;


    // User:Gameavatar = 1:1
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User user;   // 게임 아바타



}
