import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router()
import Product from '../models/productModal.js'

// @dec      Fetch all products
// @routes   GET /api/products
// @access   PUBLIC
router.get('/', asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @dec      Fetch single products
// @routes   GET /api/products/:id
// @access   PUBLIC
router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product Not Found', status: 404 })
    }
}))


export default router