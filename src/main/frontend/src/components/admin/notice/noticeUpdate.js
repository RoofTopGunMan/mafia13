import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, FormSelect } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import "./notice.css"

const NoticeUpdate = () => {

    let {id} = useParams();
    const navigate = useNavigate();

    const [notice, setNotice] = useState({
        title: "",
        content: "",
        type: "",
    });

    useEffect(() => {
        fetch("http://localhost:8093/admin/notice/" + id)
        .then(response => response.json())
        .then(data => {
            setNotice(data);
        })
    }, []);

    const changeValue = (e) => {
        setNotice({
            ...notice,
            [e.target.name]: e.target.value,
        });
    }

    const submitNotice = (e) => {
        e.preventDefault();

        // 값 보내기
        fetch("http://localhost:8093/admin/notice", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(notice),
        })
        .then(response => {
            if(response.status === 200) {
                return response.json();
            } else return null;
        })
        .then(data => {
            if(data !== null) {
                alert("공지가 수정되었습니다.");
                navigate(`/admin/notice/${data.id}`);
            } else alert("공지 수정에 실패했습니다.");
        })
    }

    return (
        <>
            <h2 className='mt-2 mx-2'><strong>공지 수정 페이지</strong></h2>
            <Form className='noticeForm' onSubmit={submitNotice}>
                <Form.Group className='m-3'>
                    <Form.Label>제목</Form.Label>
                    <Form.Control type='text' placeholder='공지 제목 입력란' onChange={changeValue} name='title' value={notice.title}/>
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder='공지 내용' onChange={changeValue} name='content' value={notice.content}/>
                </Form.Group>
                <Form.Group>
                    <Form.Select className='m-3' style={{width: '150px'}} onChange={changeValue} name='type'>
                        <option name='type' selected={notice.type === "ALARM"} value="ALARM">알림</option>
                        <option name='type' selected={notice.type === "NOTICE"} value="NOTICE">공지</option>
                    </Form.Select>
                </Form.Group>
                {/* 버튼 누르면 입력된 값이 DB에 추가되도록 하기 */}
                <Button className='m-3' variant='secondary' size="sm" type='submit'>수정하기</Button>
                <Button variant='secondary' size="sm" onClick={() => navigate(-1)}>돌아가기</Button>
            </Form>
        </>
    );
};

export default NoticeUpdate;