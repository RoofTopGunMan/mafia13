
import { Col, Container, Image, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
const Header = () => {
    return (
        <>
    
    <Container>
      <Row>
        <Col xs={6} md={4}>
          상점:<Image src="https://img.icons8.com/ios/100/online-shop.png" />
        </Col>
        <Col xs={6} md={4}>
              경매장:<Image src="https://img.icons8.com/pastel-glyph/64/auction.png" />
        </Col>
        <Col xs={6} md={4}>
          마이페이지:<Image src="https://img.icons8.com/fluency-systems-regular/48/user-male-circle--v1.png"  />
        </Col>
      </Row>
    </Container>
                
    
   
      
</>
    );
};

export default Header;