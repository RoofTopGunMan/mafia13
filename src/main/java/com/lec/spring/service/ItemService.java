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

    @Transactional(readOnly = true)
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Item findById(Long id){
        return itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요."));
    }

    @Transactional
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Transactional
    public Item updateItem(Item item) {
        Item itemEntity = itemRepository.findById(item.getId()).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));

        // 아이템 정보 수정
        itemEntity.setName(item.getName()); // 아이템 이름
        itemEntity.setType(item.getType()); // 아이템 부위(테투리, 머리, 옷, 망토)
        itemEntity.setPrice(item.getPrice()); // 아이템 가격
        itemEntity.setStatus(item.getStatus()); // 아이템 종류 (상점 / 인게임)
        itemEntity.setAttachment(item.getAttachment()); // 아이템 이미지

        return itemEntity;
    }

    @Transactional
    public String deleteItem(Long id) {
        itemRepository.deleteById(id);
        return "ok";
    }

    // 마이페이지
    @Transactional
    public List<Item> findByUserId(Long userId) {
        return itemRepository.findByUserId(userId);
    }

}
