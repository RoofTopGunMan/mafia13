package com.lec.spring.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.batch.BatchProperties;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString(callSuper = true)
@Builder
@EqualsAndHashCode(callSuper = true)
public class Game_vote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User voter;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private User elector;

    private String voteType;

    //발송 당시 카운트 및 상태
    private int roundCount;
    private int roundState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    Game_roomState gameRoomState;
}

