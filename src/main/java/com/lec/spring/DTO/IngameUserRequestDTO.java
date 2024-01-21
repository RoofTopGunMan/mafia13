package com.lec.spring.DTO;

import com.lec.spring.domain.Game_room;
import com.lec.spring.domain.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngameUserRequestDTO implements defaultDTO<User>{
    @NotEmpty
    private Long id;

    private String userName;


    @Override
    public User toEntity() {
        return User.builder().
                username(userName).
                id(id).
                build();
    }

    @Override
    public defaultDTO<User> toDTO(User user) {
        return IngameUserRequestDTO.builder()
                .userName(user.getUsername())
                .id(user.getId())
                .build();
    }
}
