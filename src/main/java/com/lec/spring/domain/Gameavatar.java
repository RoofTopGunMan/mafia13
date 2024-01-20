package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.*;
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


    @ColumnDefault(value = "0")
    private int head;

    @ColumnDefault(value = "0")
    private int cloak;

    @ColumnDefault(value = "0")
    private int outline;






}
