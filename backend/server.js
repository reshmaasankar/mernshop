import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/product.js';
import connectDb from './config/db.js';

const port = process.env.PORT || 5000;


connectDb();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running')
});

app.get('/products', (req, res) => {
    res.json(products)
})

app.listen(port, () =>{
    console.log(`Server running on ${port}...`)
})