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
public class Item extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id; // PK

    @Column
    private  String name; // 아이템 이름

    @Column
    private  String type; // 아이템타입 (머리,망토,몸)

    @Column
    private  int price; // 아이템 가격

    @Column
    private  String status; // 아이템상태

    @Column
    private  String img; // 상품 이미지


}
