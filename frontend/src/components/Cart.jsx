import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row, Card, Button,Form, ListGroup } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../reducers/cartSlice';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {cart} = useSelector((state) => state);
  const {cartItems} = cart;
  
  const handleAddToCart = (product, qty) =>{
      dispatch(addToCart({...product, qty}));
    };

  const handleDeleteProduct = (id) =>{
    dispatch(removeFromCart(id))
  }
  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 && (
          <p>No items in the cart.<Link to={`/`}>Go back</Link> to home page.</p>
        )}
        <ListGroup variant='flush'>
        { cartItems.map(product => (
          <ListGroup.Item key={product._id}>
        <Row> 
            <Col md={3}><Card.Img src={product?.image} variant='top'/></Col>
            <Col md={3}><p>{product?.name}</p> </Col>
            <Col md={2}><p>{product?.price}</p> </Col>
            <Col md={2}>
              <Form.Control as='select' value={product?.qty} onChange={(e) =>{handleAddToCart(product, Number(e.target.value))}}>
                    {[...Array(product?.countInStock).keys()].map((d) =>(
                      <option key={d+1} value={d+1}>{d+1}</option>
                    ))}
              </Form.Control>
            </Col>
            <Col md={1}>
                    <Button type='button' variant='light' onClick={(e) => handleDeleteProduct(product?._id)}><FaTrash/></Button>
            </Col>
        </Row>
         </ListGroup.Item>
    ))} 
    </ListGroup>
      </Col>

      <Col md={4}>
         <Card>
          <ListGroup variant='flush'>
              <ListGroup.Item>Sub total: ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}) items</ListGroup.Item>
              <ListGroup.Item>Total proce: {cart.totalPrice}</ListGroup.Item>
              <Button type='button' disabled={cartItems.length === 0} onClick={() => navigate('/shipping')}>Checkout</Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )}

export default Cart
