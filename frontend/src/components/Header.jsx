import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../reducers/userApiSlice';
import { logout } from '../reducers/authSlice';

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutAPI] = useLogoutMutation(); // can call this function anything
    
    const handleLogout = async () =>{
        try {
            await logoutAPI().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log('Error in logout!!!')
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand>
                        <Link to={`/`} style={{ textDecoration: "none" }}>MernShop</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls='nav-toggle' />
                    <Navbar.Collapse id='nav-toggle' />
                    <Nav>
                        <Nav.Link><FaShoppingCart />
                            <Link style={{ textDecoration: "none" }} to={`/cart`}>
                                Cart
                            </Link>
                            {cartItems?.length > 0 && <Badge pill bg='success'>{cartItems.reduce((acc, curr) => acc + curr.qty, 0)}</Badge>}
                        </Nav.Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} >
                                <Link to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </Link>
                                <Link to='/logout'>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        ) : <Nav.Link><FaUser /> Signin</Nav.Link>}
                        
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header