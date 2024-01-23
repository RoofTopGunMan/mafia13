package com.lec.spring.service;

import com.lec.spring.domain.Gameavatar;
import com.lec.spring.repository.GameavatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameavatarService {

    @Autowired
    private GameavatarRepository gameavatarRepository;


    // 아바타 저장
    public Gameavatar save(Gameavatar gameavatar){
        return  gameavatarRepository.save(gameavatar);

    }

    // 아바타 가져오기
    @Transactional(readOnly = true)
    public List<Gameavatar> findAll(){ return gameavatarRepository.findAll();}








}
