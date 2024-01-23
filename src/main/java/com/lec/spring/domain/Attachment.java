package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Attachment extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id; // PK

    @Column(nullable = false)
    private  Long user_id;

    @Column(nullable = false)
    private  String sourcename;

    @Column(nullable = false)
    private String filename;

}
