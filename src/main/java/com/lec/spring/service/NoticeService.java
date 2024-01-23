package com.lec.spring.service;

import com.lec.spring.domain.Notice;
import com.lec.spring.repository.NoticeRepository;
import com.lec.spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Struct;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    @Transactional(readOnly = true)  // 홈 페이지에서 공지 5명 불러오기
    public List<Notice> loadNoticeAtHome () {
        return noticeRepository.findTop5ByOrderByIdDesc();
    }

    @Transactional(readOnly = true)
    public List<Notice> findAll() {
        return noticeRepository.findAll();
    }
    @Transactional
    public Notice saveNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    @Transactional
    public Notice updateNotice(Notice notice) {
        Notice noticeEntity = noticeRepository.findById(notice.getId()).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));

        // 공지 수정
        noticeEntity.setTitle(notice.getTitle());
        noticeEntity.setContent(notice.getContent());
        noticeEntity.setState(notice.getState());
        noticeEntity.getUpdatedAt();

        return noticeEntity;
    }

    @Transactional
    public String deleteNotice(Long id) {
        noticeRepository.deleteById(id);

        return "ok";
    }
}
