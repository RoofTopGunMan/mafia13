import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {

    return (
        <>
            <Navbar bg='secondary' data-bs-theme='dark'>
                <Container>
                    <Navbar href="/admin">관리자 페이지</Navbar>
                    <Nav className='me-auto'>
                        <Link className='nav-link' to="/admin">홈</Link>
                        <Link className='nav-link' to="/admin/notice">공지사항</Link>
                        <Link className='nav-link' to="/admin/userMng">유저관리</Link>
                        <Link className='nav-link' to="/admin/sellMng">상품관리</Link>
                        <Link className='nav-link' to="/admin/userRecord">유저전적</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;