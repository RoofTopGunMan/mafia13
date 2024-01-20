import React, { useRef, useState } from 'react';
import { Badge, Button, Form, Overlay, OverlayTrigger, Popover, Table } from 'react-bootstrap';

import './userInfo.css';

// 임시 유저 데이터
const userData = [
    {
        id: 1,
        username: "ljs4180",
        name: "이정식",
        email: "ljs4180@naver.com",
        gamemoney: 20000,
        state: "ADMIN",
        // 가입일도 추가해야함
    },
    {
        id: 2,
        username: "aabb",
        name: "아무말",
        email: "aaaa@naver.com",
        gamemoney: 12345,
        state: "MEMBER",
    },
    {
        id: 3,
        username: "deadman",
        name: "시체",
        email: "deadman@naver.com",
        gamemoney: 2000,
        state: "DELETE",
    },
]


const UserInfo = () => {
    
    // 유저 정보 받아오기
    const [data, setData] = useState(userData);

    // 유저 전적 정보 받아오시
    const [userRecord, setUserRecord] = useState([]);
    
    // 전적 불러오기(임시)
    const showRecord = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">유저 전적</Popover.Header>
            <Popover.Body>
                여기에 유저 전적을 표시
            </Popover.Body>
        </Popover>
    )

    return (
        <>
            <div className='m-2'>
                <h3><strong>전체 회원 관리</strong></h3>

                <div>
                    {/* 유저 상태, 게임머니를 변경하는 기능 추가예정 */}
                </div>
        
                {/* 유저 정보는 Table로 출력하기 + Overlay로 전적 출력 */}
                <Form className='my-5 mx-2'>
                    <div className='mb-2'>
                        <label>유저검색: </label>
                        <input className='userSearch'/>
                        <button className='searchButton'>검색</button>
                        {/* 변경 시  */}
                        <Form.Select className='usertype' size='sm'>
                            <option>전체</option>
                            <option value="1">ADMIN</option>
                            <option value="2">MEMBER</option>
                            <option value="3">DELETE</option>
                        </Form.Select>
                    </div>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>회원번호</th>
                                <th>아이디(닉네임) </th>
                                <th>이메일</th>
                                <th>가입일</th>
                                <th>게임머니</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map(row => {
                                return (
                                <>
                                    <tr key={row.id}>
                                        <td>
                                            <Form.Check 
                                                id={row.id}
                                            />
                                        </td>
                                        <td>{row.id}</td>
                                        <td>
                                            {row.username}({row.name})
                                            <OverlayTrigger trigger="hover" placement='bottom' overlay={showRecord}>    
                                                <Button bsPrefix='userList'>전적</Button>
                                            </OverlayTrigger>
                                        </td>
                                        <td>{row.email}</td>
                                        <td></td>
                                        <td>{row.gamemoney}</td>
                                        <td>
                                            {row.state === "ADMIN" ? 
                                                    <Badge bg="primary">ADMIN</Badge> : row.state === "MEMBER" ?
                                                    <Badge bg="success">MEMBER</Badge> : <Badge bg="secondary">DELETE</Badge>}
                                        </td>
                                    </tr>
                                </>    
                                )
                            })}
                        </tbody>
                    </Table>
                </Form>
            </div>
        </>
    );
};

export default UserInfo;