
import { Card, Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import "./lobby.css";
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <>
    
      <Row>
            <Col className='row1'>   
              <Link to="/">
                 <img src="https://img.icons8.com/ios/100/online-shop.png"  width={"20%"} alt="" />
              </Link>
              상점
            </Col>
            <Col className='row1'>
              <Link to="/">
                <img src="https://img.icons8.com/pastel-glyph/64/auction.png" width={"20%"} alt=""  />
              </Link>
              경매장
            </Col>
            <Col className='row1'>
          
              <Dropdown>
      <Dropdown.Toggle variant="light" >
      
                <img src="https://img.icons8.com/fluency-systems-regular/48/user-male-circle--v1.png" width={"100%"} alt="" />
            
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/mypage">마이페이지</Dropdown.Item>
        <Dropdown.Item href="/user/login">로그아웃</Dropdown.Item>
        </Dropdown.Menu>
    마이페이지  
            </Dropdown>
            
            </Col>
          </Row>
      

</>
    );
};

export default Header;