package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.*;

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

    // Gameavatar:User = 1:1
    @OneToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    private User user;   // 해당 유저 (FK)


}
