package com.lec.spring.repository;

import com.lec.spring.domain.Item;
import com.lec.spring.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> getByUserId(Long userId);
}
