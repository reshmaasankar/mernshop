import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect> 
            <Container>
                <Navbar.Brand href='/'>MernShop</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-toggle'/>
                    <Navbar.Collapse id='nav-toggle'/>
                    <Nav>
                        <Nav.Link><FaShoppingCart/> Cart</Nav.Link>
                        <Nav.Link><FaUser/> Signin</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header