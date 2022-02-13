import asyncHandler from "express-async-handler";
import Product from '../models/productModal.js'

// @dec      Fetch all products
// @routes   GET /api/products
// @access   PUBLIC
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @dec      Fetch single products
// @routes   GET /api/products/:id
// @access   PUBLIC
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product Not Found', status: 404 })
    }
})

export { getProducts, getProductById }