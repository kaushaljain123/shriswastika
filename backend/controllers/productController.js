import asyncHandler from "express-async-handler";
import Product from '../models/productModal.js'

// @dec      Fetch all products
// @routes   GET /api/products
// @access   PUBLIC
const getProducts = asyncHandler(async(req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
  console.log(keyword)
  ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
  : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
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

// @dec      Delete a product
// @routes   GET /api/products/:id
// @access   PRIVATE/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404).json({ message: 'Product Not Found', status: 404 })
    }
})

// @dec      Create a product
// @routes   POST /api/products
// @access   PRIVATE/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      videoLink: 'www.youtube.com',
      brand: 'Sample brand',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      videoLink,
      brand,
      category,
      subCategory,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.brand = brand
      product.image = image
      product.videoLink = videoLink
      product.category = category
      product.subCategory = subCategory
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts }