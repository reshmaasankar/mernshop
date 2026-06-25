import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../reducers/productsApiSlice';
import { Col, Row, Card, Button,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addToCart } from '../reducers/cartSlice';
import { useDispatch } from 'react-redux';


const Productdetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const {id: productId} = useParams();
  const {data:product, isLoading, isError} = useGetProductDetailsQuery(productId);

  const handleAddToCart = () =>{
    dispatch(addToCart({...product, qty}));
    navigate('/cart')
  }
  return (
    <Row>
      <Col md={6}>
        <Card className='p-3 rounded'>
        <Link>
            <Card.Img src={product?.image} variant='top'/>
        </Link>
      </Card>
      </Col>
      <Col md={3}>
      <h3>{product?.name}</h3>
      <p>{product?.description}</p>
      </Col>
      <Col md={3}>
        <div>
          <p>Price: {product?.price}</p>
          <p>Quantity:</p> 
            <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {[...Array(product?.countInStock).keys()].map((d) =>(
                <option key={d+1} value={d+1}>{d+1}</option>
              ))}
              </Form.Control>
          
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </Col>
    </Row>
    
  )
}

export default Productdetails
