import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect> 
            <Container>
                <Navbar.Brand>
                <Link to={`/`} style={{textDecoration: "none"}}>MernShop</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-toggle'/>
                    <Navbar.Collapse id='nav-toggle'/>
                    <Nav>
                        <Nav.Link><FaShoppingCart/>
                        <Link style={{textDecoration: "none"}} to={`/cart`}>
                         Cart
                         </Link>
                         </Nav.Link>
                        <Nav.Link><FaUser/> Signin</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header