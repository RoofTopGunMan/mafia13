import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {

    // 유저 정보 받아오기
    const [users, setUsers] = useState([]);

    // 공지사항 글들 받아오기
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8093/admin/notice")
            .then(responce => responce.json())
            .then(data => {
                setNotices(data);
            })
    }, []);


    return (
        <>
            <Container className='mt-4'>
                <Row>
                    {/* 공지사항 란 */}
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className='mb-1'>공지사항</h4>
                            <Link to='/admin/notice' className='btn btn-sm btn-secondary float-end'>관리</Link>
                        </div>
                        <hr/>
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        {/* 공지사항 목록 정하기 */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* map으로 값 뿌리기 */}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    {/* 유저관리 란 */}
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className='mb-1'>유저관리</h4>
                            <Link to='/admin/userMng' className='btn btn-sm btn-secondary float-end'>관리</Link>
                        </div>
                        <hr/>
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        {/* 유저 목록 정하기 */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* map으로 값 뿌리기 */}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                                <h4 className='mb-1'>상품관리</h4>
                                <Link to='/admin/sellMng' className='btn btn-sm btn-secondary float-end'>관리</Link>
                        </div>
                        <hr/>
                        <div>
                            {/* 상품들을 가로로 정렬, 드래그로 목록보게 하기 */}
                            {/* Cards 활용 예정 */}             
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Home;