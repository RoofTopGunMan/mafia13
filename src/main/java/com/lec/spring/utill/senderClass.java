package com.lec.spring.utill;

import lombok.Data;

@Data
public class senderClass {
    private String sender;


    // 0 = 입장
    // 1 = 퇴장
    // 2 = 채팅
    // 3 = 투표
    private int senderType;

    //데이터 ?
    private String data;

    // 방 아이디
    // -1인경우 로비
    private Long roomId;
    
    //보내는 아이디
    private Long userId;

    
}
