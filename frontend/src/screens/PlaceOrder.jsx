import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Form, ListGroup, Image, Card } from 'react-bootstrap';
import { useCreateOrderMutation } from '../reducers/ordersApiSlice';
import { clearCartItems } from '../reducers/cartSlice';

const PlaceOrder = () => {

    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('cart', cart)
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.pincode},
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method</strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <p>No cart items</p>
                        ) : (
                            <ListGroup>
                                {cart.cartItems.map((item, i) => (
                                    <ListGroup.Item key={i}>
                                        <Row>
                                            <Col md={1}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                >
                                                </Image>
                                            </Col>
                                            <Col>
                                                {item.name}
                                            </Col>
                                            <Col>
                                                {item.qty}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <h2>Order summary</h2>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>Items: {cart.itemsPrice}</ListGroup.Item>
                        <ListGroup.Item>Shipping: {cart.shippingPrice}</ListGroup.Item>
                        <ListGroup.Item>Tax: {cart.taxPrice}</ListGroup.Item>
                        <ListGroup.Item>Total: {cart.totalPrice}</ListGroup.Item>
                        {isLoading && <p>Loading!!!</p>}
                        <Button type='button' onClick={placeOrderHandler}>Place order</Button>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default PlaceOrder