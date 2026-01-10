import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {
  return (
    <Card className='p-3 rounded'>
        <a href='' >
            <Card.Img src={product.image} variant='top'/>
        </a>

        <Card.Body>
            <a href=''>
                <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
            </a>

            <Card.Text>{product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product