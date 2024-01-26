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
    private  Long item_id;

    @Column(nullable = false)
    private  String filename;   // 이미지 이름

    @Column(nullable = false)
    private  String filepath;   // 이미지 저장 경로


}
