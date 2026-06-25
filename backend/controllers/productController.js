import ayncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


const getProducts = ayncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products)
});

const getProductById = ayncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
            res.json(product)
    }else{
        res.json(400).json({message: 'Product not found'})
    }
});

export {getProducts, getProductById};