import React from 'react';
import { Accordion, Badge, Button, Card, CardBody, CardText, Form } from 'react-bootstrap';

const noticeList = [
    {
        id: 1,
        title: '공지1 입니다',
        content: '공지1 내용입니다.',
        type: "NOTICE"
    }
]

const Notice = () => {
    return (
        <>
            <div className='mx-3 my-3 clearfix'>
                <h3 className='mb-3'>
                    <strong>공지사항</strong>
                </h3>

                {/* 공지사항 값들을 받아와 Card로 정렬하기 */}
                {noticeList.map(n => {
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
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>제목</Form.Label>
                                <Form.Control type='text' placeholder='상품 이름 입력란'/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>내용</Form.Label>
                                <Form.Control as="textarea" rows={6}/>
                            </Form.Group>
                        </Form>
                        {/* 버튼 누르면 입력된 값이 DB에 추가되도록 하기 */}
                        <Button variant='secondary' size="sm">등록하기</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default Notice;