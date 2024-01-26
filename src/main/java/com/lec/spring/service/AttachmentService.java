package com.lec.spring.service;

import com.lec.spring.domain.Attachment;
import com.lec.spring.repository.AttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;

    @Transactional
    public Attachment save(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }

    @Transactional(readOnly = true)
    public List<Attachment> findAll() {
        return attachmentRepository.findAll();
    }

    @Transactional
    public Attachment update(Attachment attachment) {
        Attachment attachEntity = attachmentRepository.findById(attachment.getId()).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));

        attachEntity.setFilename(attachment.getFilename());
        attachEntity.setFilepath(attachment.getFilepath());

        return attachEntity;
    }

    @Transactional(readOnly = true)
    public Attachment findById(Long id) {
        return attachmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요."));
    }

}
