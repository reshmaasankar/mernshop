import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {

    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container className='text-center'>
                <p>MernShop &copy; {currentYear}</p>
            </Container>
        </footer>
    )
}

export default Footer