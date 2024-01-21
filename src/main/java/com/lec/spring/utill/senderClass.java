package com.lec.spring.utill;

import lombok.Data;

@Data
public class senderClass {
    private String sender;


    // 0 = 입장
    // 1 = 퇴장
    // 2 = 채팅

    private int senderType;

    private String data;

    private int roomId;
}
