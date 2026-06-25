import React from 'react'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import { Button, Col, Row,Form, } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../reducers/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCredential } from '../reducers/authSlice';

function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [register, {isLoading}] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'

    const submitForm = async(e) =>{
        e.preventDefault();
        try{
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredential({...res}));
            navigate(redirect);
        }catch (err) {
            console.log('error!!!!', err)
        }
    }
  return (
    <FormContainer>
        <h1>Sign up</h1>
        <Form onSubmit={submitForm}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter your name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                >
                </Form.Control> 
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                >
                </Form.Control> 
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' disabled={!name || !email || !password}>Sign Up</Button>

            {isLoading && <div>Loading!!!</div>}
        </Form>

        <Row>
            <Col>
                Already have an account? <Link to={'/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Register