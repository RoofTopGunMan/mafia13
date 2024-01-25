package com.lec.spring.service;

import com.lec.spring.domain.Item;
import com.lec.spring.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    @Transactional
    public List<Item> loadAllItem() {
        return itemRepository.findAll();
    }

   // 해당 유저에 관한 아이템 항목
    @Transactional
    public List<Item> getByuserId(Long userId){return itemRepository.getByUserId(userId);}

}
