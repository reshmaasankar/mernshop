import React from 'react'
import { useState } from 'react'
import FormContainer from '../components/FormContainer';
import { Button, Col, Row,Form, } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../reducers/cartSlice';

const Payment = () => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [paymentMethod, setPaymentMethod] = useState('payPal');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate]);

    const handleSubmit = (e) =>{
        console.log('inside')
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <h1>Payment method</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label as='legend'>Select method</Form.Label>
            <Form.Check
            type='radio'
            label='Paypal or Credit card'
            value='payPal'
            checked
            onChange={(e)=> setPaymentMethod(e.target.value)}
            >
            </Form.Check> 
        </Form.Group>
        <Button type='submit'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default Payment