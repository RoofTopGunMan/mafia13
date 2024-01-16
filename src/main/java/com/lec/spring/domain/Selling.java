package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Selling {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id; // PK

    @Column(nullable = false)
    private Long name;

    @Column(nullable = false)
    private  Long price;

    @Column
    private int status;

    // Selling:User = N:1
    @ManyToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    private User user;   // 글 작성자 (FK)

}