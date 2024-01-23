import React, { useState } from 'react';
import { Accordion, Badge, Button, Card, CardBody, CardText, Form, FormSelect} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Notice = () => {

    const navigate = useNavigate();

    const [notice, setNotice] = useState({
        title: "",
        content: "",
        type: "",
    })

    const submitNotice = (e) => {
        e.preventDefault();

        // 값 보내기
        fetch("http://localhost:8080/admin/notice", {
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
                navigate(`/book/${data.id}`);
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
            <div className='mx-3 my-3 clearfix'>
                <h3 className='mb-3'>
                    <strong>공지사항</strong>
                </h3>

                {/* 공지사항 값들을 받아와 Card로 정렬하기 */}
                {notice.map(n => {
                    return (
                        <>
                            {/* Card로 제목과 종류만 출력 */}
                            <Card style={ {height: '10rem', width: '17rem'}}>
                                <Card.Body>
                                    <Card.Title>{n.title}</Card.Title>
                                    <CardText>
                                        {n.content}
                                    </CardText>
                                    <CardText>
                                        {n.type === "NOTICE" ?
                                            <Badge bg='primary'>Notice</Badge> :
                                                <Badge bg='Secondary'></Badge>}
                                        <button className='btn bnt-sm btn-success'>상세</button>
                                    </CardText>
                                </Card.Body>
                            </Card>

                            {/* 가능하면 페이징 넣어보기 */}
                        </>
                    )
                })}


            </div>
            <hr style={{width: '90%', margin: 'auto'}}/>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>공지 등록</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={submitNotice}>
                            <Form.Group className='mb-3'>
                                <Form.Label>제목</Form.Label>
                                <Form.Control type='text' placeholder='상품 이름 입력란' onChange={changeValue} name='title'/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>내용</Form.Label>
                                <Form.Control as="textarea" rows={6} onChange={changeValue} name='content'/>
                            </Form.Group>
                            <Form.Group>
                                <FormSelect className='mb-3' onChange={changeValue} name='type'>
                                    <option>종류 선택</option>
                                    <option value="NOTICE">공지</option>
                                    <option value="ALARM">알림</option>
                                </FormSelect>
                            </Form.Group>
                        </Form>
                        {/* 버튼 누르면 입력된 값이 DB에 추가되도록 하기 */}
                        <Button variant='secondary' size="sm" type='submit'>등록하기</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default Notice;