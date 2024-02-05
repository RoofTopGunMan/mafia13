package com.lec.spring.repository;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
