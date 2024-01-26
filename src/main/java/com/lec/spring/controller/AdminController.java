package com.lec.spring.controller;

import com.lec.spring.domain.Item;
import com.lec.spring.domain.Notice;
import com.lec.spring.service.ItemService;
import com.lec.spring.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class AdminController{

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
    @GetMapping("/admin/sellMng")
    @CrossOrigin
    public ResponseEntity<?> sellMng() {
        return new ResponseEntity<>(itemService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/admin/sellMng")
    @CrossOrigin
    public ResponseEntity<?> saveItem(@RequestBody Item item) {
        return new ResponseEntity<>(itemService.saveItem(item), HttpStatus.CREATED);
    }

    @GetMapping("/admin/sellMng/{id}")
    @CrossOrigin
    public ResponseEntity<?> detailItem(@PathVariable Long id) {
        return new ResponseEntity<>(itemService.findById(id), HttpStatus.OK);
    }

    @PutMapping("/admin/sellMng")
    @CrossOrigin
    public ResponseEntity<?> updateItem(@RequestBody Item item) {
        return new ResponseEntity<>(itemService.updateItem(item), HttpStatus.OK);
    }

    @DeleteMapping("/admin/sellMng/{id}")
    @CrossOrigin
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        return new ResponseEntity<>(itemService.deleteItem(id), HttpStatus.OK);
    }


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

    @GetMapping("/admin/notice/{id}")
    @CrossOrigin
    public ResponseEntity<?> detailNotice(@PathVariable Long id) {
        return new ResponseEntity<>(noticeService.findById(id), HttpStatus.OK);
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

    // 이미지 업로드

}
