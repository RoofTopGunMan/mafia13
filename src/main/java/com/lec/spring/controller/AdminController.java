package com.lec.spring.controller;

import com.lec.spring.domain.Notice;
import com.lec.spring.service.ItemService;
import com.lec.spring.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final NoticeService noticeService;
    private final ItemService itemService;

    // 홈 페이지
    @GetMapping("/admin")
    @CrossOrigin
    public ResponseEntity<?> home() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    // 유저관리 페이지


    // 상품관리 페이지


    // 공지 페이지
    @GetMapping("/admin/notice")
    @CrossOrigin
    public ResponseEntity<?> notice() {
        return new ResponseEntity<>(noticeService.findAll(), HttpStatus.OK); // 200
    }

    @PostMapping("/admin/notice")
    @CrossOrigin
    public ResponseEntity<?> saveNotice(@RequestBody Notice notice) {
        return new ResponseEntity<>(noticeService.saveNotice(notice), HttpStatus.CREATED); // 201
    }

    @PutMapping("/admin/notice")
    @CrossOrigin
    public ResponseEntity<?> updateNotice(@RequestBody Notice notice) {
        return new ResponseEntity<>(noticeService.updateNotice(notice), HttpStatus.OK);
    }

    @DeleteMapping("/admin/notice/{id}")
    @CrossOrigin
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        return new ResponseEntity<>(noticeService.deleteNotice(id), HttpStatus.OK);
    }
}
