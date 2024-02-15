
import { Card, Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import "./lobby.css";
import { Link } from 'react-router-dom';
const Header = () => {
    return (

    <>
    <Container id='container'>
      <Row id="headerWrap" className="justify-content-center">
            <Col className='row1'>   
              <Link to="/">
                 <img src="https://img.icons8.com/ios/100/online-shop.png"  width={"20%"} alt=""  className='lobbyImg'/>
              </Link>
              상점
            </Col>

            <Col className='row1'>
              <Link to="/">
                <img src="https://img.icons8.com/pastel-glyph/64/auction.png" width={"20%"} alt=""  className='lobbyImg' />
              </Link>
              경매장
            </Col>

            <Col className='row1'>
              <Dropdown>
              <Dropdown.Toggle variant="light" >
                  <img src="https://img.icons8.com/fluency-systems-regular/48/user-male-circle--v1.png" width={"100%"} alt="" className='lobbyImg'/>    
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/mypage">마이페이지</Dropdown.Item>
                <Dropdown.Item href="/user/login">로그아웃</Dropdown.Item>
              </Dropdown.Menu>
                  마이페이지  
              </Dropdown>
            </Col>
        </Row>
      </Container>
      </>
    );
};

export default Header;