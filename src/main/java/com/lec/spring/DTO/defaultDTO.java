package com.lec.spring.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface defaultDTO <T> {

    T toEntity() ;
    defaultDTO<T> toDTO(T defaultDTO) ;
}
