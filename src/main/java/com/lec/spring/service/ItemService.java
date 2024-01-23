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

}
