package com.lec.spring.DTO;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequestDTO {
    @NotEmpty
    private Long id;

    private String subject;


    public Game_room toEntity(){
        return Game_room.builder().
                subject(subject).
                build();
    }

    public RoomRequestDTO toDto(Game_room room) {
        return RoomRequestDTO.builder()
                .subject(room.getSubject())
                .id(room.getId())
                .build();
    }
}
