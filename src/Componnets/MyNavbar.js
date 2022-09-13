import {Button,Navbar,Nav,Container,Table} from 'react-bootstrap';
import Notification from './Notification';
const MyNavbar=()=>
{
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/dashboard">STOCKIMIN</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          <Nav.Link href="/sellitem">OutShop</Nav.Link>
          <Nav.Link href="#pricing"><Notification href='#pricing'/></Nav.Link>
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    );
}

export default MyNavbar;