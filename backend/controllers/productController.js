const asyncHandler = require("express-async-handler");
const Product = require("../models/productModal");
const excel = require("exceljs");

// @dec      Fetch all products
// @routes   GET /api/products
// @access   PUBLIC
exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword =
    req.query.keyword || req.query.categoryData
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

  const categoryData = { subCategory: req.query.categoryData };

  if (req.query.keyword) {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else if (req.query.categoryData) {
    const count = await Product.countDocuments({ ...categoryData });
    const products = await Product.find({ ...categoryData })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    const count = await Product.countDocuments({});
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      status: true,
    });
  }
});

// @dec      Fetch single products
// @routes   GET /api/products/:id
// @access   PUBLIC
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found", status: 404 });
  }
});

// @dec      Delete a product
// @routes   GET /api/products/:id
// @access   PRIVATE/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404).json({ message: "Product Not Found", status: 404 });
  }
});

// @dec      Create a product
// @routes   POST /api/products
// @access   PRIVATE/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    mrp: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    videoLink: "www.youtube.com",
    brand: "Sample brand",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    mrp,
    description,
    image,
    imageTwo,
    imageThree,
    videoLink,
    brand,
    category,
    subCategory,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.mrp = mrp;
    product.description = description;
    product.brand = brand;
    product.image = image;
    product.imageTwo = imageTwo;
    product.imageThree = imageThree;
    product.videoLink = videoLink;
    product.category = category;
    product.subCategory = subCategory;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @dec         Download csv file
//@route        create /api/products/downloadCsvtemplate
//@access       Private
//author        kaushal
exports.downloadCSVFileForAllProduct = asyncHandler(async (req, res, next) => {
  Product.find().then((objs) => {
    let catalogs = [];

    objs.forEach((obj) => {
      catalogs.push({
        id: obj._id,
        Name: obj.name,
        Brand: obj.brand,
        Description: obj.description,
        Price: obj.price,
        MRP: obj.mrp,
        Stocks: obj.countInStock,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("catalogs");

    worksheet.columns = [
      { header: "Id", key: "id", width: 20 },
      { header: "Name", key: "Name", width: 50 },
      { header: "Brand", key: "Brand", width: 50 },
      { header: "Description", key: "Description", width: 50 },
      { header: "Price", key: "Price", width: 50 },
      { header: "MRP", key: "MRP", width: 50 },
      { header: "Stocks", key: "Stocks", width: 50 },
    ];

    // Add Array Rows
    worksheet.addRows(catalogs);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "products.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
});
