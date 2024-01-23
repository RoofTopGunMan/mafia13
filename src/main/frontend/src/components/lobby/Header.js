
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
const Header = () => {
    return (
        <>
    
    <Nav justify variant="tabs">
      <Nav.Item>
        <Nav.Link href="/">상점</Nav.Link>
      </Nav.Item>          
      <Nav.Item>
        <Nav.Link href="/">경매장</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/mypage">마이페이지</Nav.Link>
      </Nav.Item>
                
    
    </Nav>

</>
    );
};

export default Header;