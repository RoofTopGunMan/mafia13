import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, OverlayTrigger, Popover, Table } from 'react-bootstrap';

const UserTable = (props) => {

    // 유저 정보
    const [user, setUser] = useState([]);

    // 유저 전적 정보
    const [userRecord, setUserRecord] = useState([]);

    // 유저 정보 불러오시
    useEffect(() => {
        fetch("http://localhost:8093/admin/userMng")
        .then(response => response.json())
        .then(data => {
            setUser(data);
        });
    }, []);

    // 전적 불러오기
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
            <Form>
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
                        {user.map(row => {
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
        </>
    );
};

export default UserTable;