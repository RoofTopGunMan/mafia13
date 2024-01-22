package com.lec.spring.DTO;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngameUserRequestDTO implements defaultDTO<User>,Comparable<IngameUserRequestDTO>{
    @NotEmpty
    private Long id;

    private String userName;

    private LocalDateTime updatedAt;

    private boolean isRoomMaster;

    @Override
    public User toEntity() {
        return User.builder().
                username(userName).
                id(id).
                build();
    }
    public defaultDTO<User> toDTO(User user,boolean isRoomMaster) {
        IngameUserRequestDTO resultDTO = (IngameUserRequestDTO) toDTO(user);
        resultDTO.isRoomMaster = isRoomMaster;
        return resultDTO;
    }
    @Override
    public defaultDTO<User> toDTO(User user) {
        return IngameUserRequestDTO.builder()
                .userName(user.getUsername())
                .id(user.getId())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    @Override
    public int compareTo(IngameUserRequestDTO o) {
        return updatedAt.compareTo(o.getUpdatedAt());
    }
}
