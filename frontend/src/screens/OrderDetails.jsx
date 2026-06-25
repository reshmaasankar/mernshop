import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Row, Image,ListGroup, Card } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../reducers/ordersApiSlice';
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
    const {id: orderId} = useParams();
    const {data, refetch, isLoading} = useGetOrderDetailsQuery(orderId);
    const [payOrder, {loading}] = usePayOrderMutation();
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
    const {data: paypal, isLoading: loadingPaypal, error: paypalError} = useGetPaypalClientIdQuery()
    const {userInfo} = useSelector(state =>  state.auth);
    console.log('paypal is', paypal)

    useEffect(() =>{
        if(!paypalError && !loadingPaypal && paypal.clientId){
            const loadPaypalScript = async () =>{
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending'})
            }
            if(data && !data.isPaid){
                if(!window.paypal){
                    loadPaypalScript();
                }
            }
        }
    }, [data, paypal, paypalDispatch, loadingPaypal, paypalError])

    const createOrder = (createData, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: Number(data.totalPrice).toFixed(2)
                    }
                }
            ]
        })
        // .then((orderId) => {
        //     return orderId
        // })
    }
    const onApprove = (data, actions) => {
        return actions.order.capture().then( async (details) => {
            try{
                await payOrder({orderId, details});
                refetch();
            }catch{
                console.log('Error while paying!!!')
            }
        })
    }

    const onError = () => {
        console.log('Error occured while paying!!!')
    }

    const testApprove = async () => {
        await payOrder({orderId, details: {payer: {}}});
        refetch();
        console.log('Saved successfuly!!!')
    }

  return isLoading ? <di> Loading ...</di> : (
    <>
        <h1>Order {data._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {data.shippingAddress.address}, {data.shippingAddress.city}, {data.shippingAddress.pincode},
                            {data.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method</strong>
                            {data.paymentMethod}
                        </p>
                        {data.isPaid ? <div>Paid on: {data.paidAt}</div> : <><p>Not paid yet</p></>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {data.orderItems.length === 0 ? (
                            <p>No order items</p>
                        ) : (
                            <ListGroup>
                                {data.orderItems.map((item, i) => (
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
                        <ListGroup.Item>Items: {data.itemsPrice}</ListGroup.Item>
                        <ListGroup.Item>Shipping: {data.shippingPrice}</ListGroup.Item>
                        <ListGroup.Item>Tax: {data.taxPrice}</ListGroup.Item>
                        <ListGroup.Item>Total: {data.totalPrice}</ListGroup.Item>
                        {!data.isPaid && (
                            <div>
                                <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                                />
                                <Button type='button' onClick={testApprove}>Pay</Button>
                            </div>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}
