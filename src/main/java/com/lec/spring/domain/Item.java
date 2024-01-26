package com.lec.spring.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
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
    private  String status; // 아이템종류 상점 / 인게임


    // Item:Attachment = 1:1
    @OneToOne
    @JoinColumn(name = "item_id")
    private  Attachment attachment;  // 아이템 이미지


    // Item:User = N:1
    @ManyToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    @JoinColumn(name ="user_id")
    private User user;   // 해당 유저 인벤토리 (FK)







}
