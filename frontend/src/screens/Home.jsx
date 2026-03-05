import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        const fetchProducts = async () =>{
            const {data} = await axios.get('/api/products');
            setProducts(data)
        };
        fetchProducts();
    },[])
  return (
    <>
        <h3>Latest Products</h3>
        <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default Home