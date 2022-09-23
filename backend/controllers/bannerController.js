const Banner = require("../models/bannerModal");
const asyncHandler = require("express-async-handler");

// @dec      Create a product
// @routes   POST /api/products
// @access   PRIVATE/Admin
exports.AddBanner = asyncHandler(async (req, res) => {
  const banner = new Banner({
    banner1: req.body.banner1,
  });

  const createBanner = await banner.save();
  res.status(201).json(createBanner);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateBanner = asyncHandler(async (req, res) => {
  const {
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
    banner8,
    banner9,
    banner10,
  } = req.body;

  const banner = await Banner.findById("62a224cebab1ed52f6a9cc0d");

  if (banner) {
    banner.banner1 = banner1;
    banner.banner2 = banner2;
    banner.banner3 = banner3;
    banner.banner4 = banner4;
    banner.banner5 = banner5;
    banner.banner6 = banner6;
    banner.banner7 = banner7;
    banner.banner8 = banner8;
    banner.banner9 = banner9;
    banner.banner10 = banner10;

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } else {
    const addNewBanner = await Banner.create({
      banner1,
      banner2,
      banner3,
      banner4,
      banner5,
      banner6,
      banner7,
      banner8,
      banner9,
      banner10,
    });
    res.json(addNewBanner);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.getBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.find();

  if (banner) {
    res.json(banner[0]);
  } else {
    res.status(404);
    throw new Error("Banner not found");
  }
});
