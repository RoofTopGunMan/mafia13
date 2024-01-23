import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

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

        fetch("http://localhost:8083/admin/notice/" + id, {
            method: "DELETE"
        })
        .then(response => response.text())
        .then(data => {
            if(data === "ok") {
                navigate('/admin/notice');
            } else alert("공지를 삭제하지 못했습니다.");
        });
    };

    const updateNotice = () => {
        navigate("/admin/updateNotice/" + id);
    }

    return (
        <div>
            <h1>상세보기: {notice.title}</h1>
            <hr/>
            <h3>{notice.content}</h3>
            <h5>
                {notice.type === "NOTICE" ?
                    <Badge bg='primary'>Notice</Badge> :
                    <Badge bg='success'>Alarm</Badge>}
            </h5>
            <Button variant='secondary' onClick={updateNotice}>수정하기</Button>
            <Button variant='danger' className='ms-2' onClick={deleteNotice}></Button>
        </div>
    );
};

export default NoticeDetail;