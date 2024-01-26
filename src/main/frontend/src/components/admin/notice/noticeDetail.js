import React, { useEffect, useState } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import "./notice.css"

const NoticeDetail = () => {
    
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

    const deleteNotice = () => {
        if(!window.confirm("이 글을 삭제하시겠습니까?")) return;

        fetch("http://localhost:8093/admin/notice/" + id, {
            method: "DELETE"
        })
        .then(response => response.text())
        .then(data => {
            if(data === "ok") {
                alert("공지를 삭제했습니다.");
                navigate('/admin/notice');
            } else alert("공지를 삭제하지 못했습니다.");
        });
    };

    const updateNotice = () => {
        navigate("/admin/updateNotice/" + id);
    }

    return (
        <>
            <h2 className='mt-2 mx-2'><strong>공지 상세 페이지</strong></h2>
            <Form className='noticeForm'>
                <Form.Group className='my-3 mx-3'>
                    <h4>
                        {notice.type === "NOTICE" ?
                            <Badge bg='primary'>Notice</Badge> :
                            <Badge bg='success'>Alarm</Badge>}
                    </h4>
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>제목</Form.Label>
                    <Form.Control placeholder={notice.title} disabled></Form.Control>
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder={notice.content} disabled></Form.Control>
                </Form.Group>
                <Button variant='secondary' className='m-3' onClick={updateNotice}>수정하기</Button>
                <Button variant='danger' onClick={deleteNotice}>삭제하기</Button>
            </Form>
        </>
    );
};

export default NoticeDetail;