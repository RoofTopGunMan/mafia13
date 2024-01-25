
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
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
              <Link to="/mypage">
                <img src="https://img.icons8.com/fluency-systems-regular/48/user-male-circle--v1.png" width={"20%"} alt="" />
              </Link>
              마이페이지
            </Col>
          </Row>
                
</>
    );
};

export default Header;