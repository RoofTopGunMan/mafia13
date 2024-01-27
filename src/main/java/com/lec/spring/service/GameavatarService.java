package com.lec.spring.service;

import com.lec.spring.domain.Gameavatar;
import com.lec.spring.domain.Item;
import com.lec.spring.domain.Notice;
import com.lec.spring.repository.GameavatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameavatarService {

    private  final GameavatarRepository gameavatarRepository;


    // 아바타 저장
    @Transactional
    public Gameavatar save(Gameavatar gameavatar){
        return  gameavatarRepository.save(gameavatar);

    }

    // 아바타 가져오기
    @Transactional(readOnly = true)
    public List<Gameavatar> findAll(){ return gameavatarRepository.findAll();}


    // 해당 유저 아바타
    @Transactional
    public List<Gameavatar> getByuserId(Long userId){return gameavatarRepository.getByUserId(userId);}


    // 아바타 수정 하기
    @Transactional
    public Gameavatar updategameavatar(Gameavatar gameavatar){
        Gameavatar gameavtarEntity = gameavatarRepository.findById(gameavatar.getId()).orElseThrow(()-> new IllegalArgumentException("id를 확인해주세요"));

        // 아바타 수정
        gameavtarEntity.setHead(gameavatar.getHead());
        gameavtarEntity.setOutline(gameavatar.getOutline());
        gameavtarEntity.setCloak(gameavatar.getCloak());

        return gameavtarEntity;
    }






}
