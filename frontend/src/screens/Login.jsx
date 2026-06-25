import React from 'react'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import { Button, Col, Row,Form, } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../reducers/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCredential } from '../reducers/authSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, {isLoading}] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'

    const submitForm = async(e) =>{
        e.preventDefault();
        try{
            const res = await login({email, password}).unwrap();
            dispatch(setCredential({...res}));
            navigate(redirect);
        }catch (err) {
            console.log('error!!!!', err)
        }
    }
  return (
    <FormContainer>
        <h1>Login form</h1>
        <Form onSubmit={submitForm}>
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
            <Button type='submit' disabled={isLoading}>Sign In</Button>

            {isLoading && <div>Loading!!!</div>}
        </Form>

        <Row>
            <Col>
                New user? <Link to={redirect? `/register?redirect=${redirect}`: '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Login