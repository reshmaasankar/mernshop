import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
  return (
    <Card className='p-3 rounded'>
        <Link>
            <Card.Img src={product.image} variant='top'/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
            </Link>
            <Card.Text>{product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product