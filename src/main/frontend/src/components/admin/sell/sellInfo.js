import React from 'react';
import { Accordion, Badge, Button, Card, Form } from 'react-bootstrap';

import './sellInfo.css'
import { Link } from 'react-router-dom';

// 임시 상품 데이터
const sellList = [
    {
        id: 1,
        name: "날개1",
        // 이미지도 값으로 있어야함 + 겅로 설정
        price: 2000,
        type: 2,
        state: 1,
        createdAt: 2
    },
    {
        id: 2,
        name: "테두리1",
        price: 2500,
        type: 1,
        state: 1,
        createdAt: 2
    },
    {
        id: 3,
        name: "옷1",
        price: 3000,
        type: 3,
        state: 1,
        createdAt: 1
    }
]

const SellInfo = () => {

    // 상품 값들 받아오기

    return (
        <>
            <div className='mx-3 my-3 clearfix'>
                <h3 className='mb-3'>
                    <strong>상품 관리</strong>
                </h3>
                {/* 상품 타입별로 정렬하기 */}
                {/* 값이 변할 때마다 새로 정렬되어야 함 */}
                <Form.Select className='typeSelect' size='sm'>
                    <option>전체 상품</option>
                    <option value="1">테두리</option>
                    <option value="2">치장품</option>
                    <option value="3">의상</option>
                </Form.Select>

                {/* 상품 값 뿌리기 */}
                {sellList.map(s => {
                    return (
                        <>
                            <Card className='sellCard'>
                                {/* 데이터에서 이미지 받아와야함 */}
                                <Card.Img variant='top' src=""/>
                                <Card.Body>
                                    <Card.Title>{s.name}</Card.Title>
                                    <Card.Text>{s.price} GM</Card.Text>
                                    <Badge bg="danger">
                                        {/* 생성된 날짜로부터 2일이 안지났으면 NEW를 표시해야함 */}
                                        {/* 아래 코딩 수정 필요함 */}
                                        {s.createdAt <= 1 ? "NEW" : ""}
                                    </Badge><br/>
                                    <Badge className='mx-1'>
                                        {s.state === 1 ? "상품아이템" : "보유아이템"}
                                    </Badge>
                                    <Badge>
                                        {s.type === 1 ? "테두리" : s.type === 2 ? "치장품" : "의상류"}
                                    </Badge>
                                    {/* Link의 경로 설정해야함 */}
                                    <Link className='btn btn-primary sellButton' to="">상세</Link>
                                    {/* 누르면 삭제되게 설정해야함 */}
                                    <Button className='sellButton' variant='danger'>삭제</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}                
            </div>
            <hr style={{width: '90%', margin: 'auto'}}/>
            <Accordion className='accordion' defaultActiveKey="0">
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>상품 추가</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Control className='input' type='file' size="sm"></Form.Control>
                                <Form.Label>상품 이름</Form.Label>
                                <Form.Control className='input' type='text' placeholder='상품 이름 입력란'/>
                                <Form.Label>가격</Form.Label>
                                <Form.Control className='input' type='number' placeholder='가격 입력란'/>
                                <Form.Label>종류</Form.Label>
                                <Form.Select className='input'>
                                    <option>상품 종류</option>
                                    <option value="1">테두리</option>
                                    <option value="2">치장품</option>
                                    <option value="3">의상</option>
                                </Form.Select>
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

export default SellInfo;