import React, { useEffect, useState } from 'react';
import { Button, Form, FormSelect } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

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
        })
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
        <div>
            <Form onSubmit={submitNotice}>
                <Form.Group className='mb-3'>
                    <Form.Label>제목</Form.Label>
                    <Form.Control type='text' placeholder='상품 이름 입력란' onChange={changeValue} name='title' value={notice.title}/>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={6} onChange={changeValue} name='content' value={notice.content}/>
                </Form.Group>
                <Form.Group>
                    <FormSelect className='mb-3' onChange={changeValue} name='type' value={notice.type}>
                        <option>종류 선택</option>
                        <option value="NOTICE">공지</option>
                        <option value="ALARM">알림</option>
                    </FormSelect>
                </Form.Group>
            </Form>
            {/* 버튼 누르면 입력된 값이 DB에 추가되도록 하기 */}
            <Button variant='secondary' size="sm" type='submit'>등록하기</Button>
        </div>
    );
};

export default NoticeUpdate;