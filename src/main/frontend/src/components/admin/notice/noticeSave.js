import React, { useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NoticeSave = () => {

    const navigate = useNavigate();

    const [notice, setNotice] = useState({
        title: "",
        content: "",
        type: "",
    });

    const submitNotice = (e) => {
        e.preventDefault();

        // 값 보내기
        fetch("http://localhost:8093/admin/notice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(notice),
        })
        .then(response => {
            if(response.status === 201) {
                return response.json();
            } else return null;
        })
        .then(data => {
            if(data !== null) {
                alert("공지가 등록되었습니다.");
                navigate(`/admin/notice/${data.id}`);
            } else alert("공지 등록에 실패했습니다.");
        })
    }

    const changeValue = (e) => {
        setNotice({
            ...notice,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>공지 등록</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={submitNotice}>
                            <Form.Group className='mb-3'>
                                <Form.Label>제목</Form.Label>
                                <Form.Control type='text' placeholder='공지 제목 입력란' onChange={changeValue} name='title'/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>내용</Form.Label>
                                <Form.Control as="textarea" rows={6} placeholder='공지 내용' onChange={changeValue} name='content'/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Select className='mb-3' onChange={changeValue} name='type'>
                                    <option name='type' value="ALARM">알림</option>
                                    <option name='type' value="NOTICE">공지</option>
                                </Form.Select>
                            </Form.Group>
                            {/* 버튼 누르면 입력된 값이 DB에 추가되도록 하기 */}
                            <Button variant='secondary' size="sm" type='submit'>등록하기</Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default NoticeSave;