import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useState } from 'react'
import { useEffect } from 'react'
import { useGetProductsQuery } from '../reducers/productsApiSlice'

const Home = () => {

  const {data:products, isLoading, isError} = useGetProductsQuery();
  return (
    <>
    {isLoading ? (
        <h2>Loading...</h2>
    ) : isError ? (<div>Errorrrr!!!</div>) : (
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
    </>
  )
}

export default Home