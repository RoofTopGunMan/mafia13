import React from 'react';
import { Badge, Button, Card, CardText } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import './notice.css'

const NoticeCard = (props) => {
    
    const {id, title, content, type} = props.notice;

    const navigate = useNavigate();

    const deleteNotice = () => {
        if(!window.confirm("이 글을 삭제하시겠습니까?")) return;

        fetch("http://localhost:8093/admin/notice/" + id, {
            method: "DELETE"
        })
        .then(response => response.text())
        .then(data => {
            if(data === "ok") {
                alert("공지를 삭제했습니다.");
                window.location.replace('/admin/notice');
            } else alert("공지를 삭제하지 못했습니다.");
        });
    };

    return (
        <div>
            <Card className='noticeCard'>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <CardText className='mt-2'>
                        {type === "NOTICE" ?
                            <Badge bg='primary'>Notice</Badge> :
                                <Badge bg='success'>Alarm</Badge>}
                    </CardText>
                    <Link to={"/admin/notice/" + id} className='mx-2 btn btn-sm btn-primary'>상세</Link>
                    <Button variant='danger' size="sm" onClick={deleteNotice}>삭제</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NoticeCard;