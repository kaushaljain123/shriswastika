const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModal");
const Product = require("../models/productModal");
const formidable = require("formidable");
const PaytmChecksum = require("./PaytmChecksum");

const setOrderIds = (orderIds) => {
  return (orderIdsss = orderIds);
};

const updatePaymentInOrder = async (fields) => {
  console.log(orderIdsss);
  console.log(fields);
  const order = await Order.findById(orderIdsss);
  console.log("its a order", order);
  if (order) {
    (order.ORDERID = fields.ORDERID),
      (order.TXNID = fields.TXNID),
      (order.TXNAMOUNT = fields.TXNAMOUNT),
      (order.PAYMENTMODE = fields.PAYMENTMODE),
      (order.CURRENCY = fields.CURRENCY),
      (order.TXNDATE = fields.TXNDATE),
      (order.STATUS = fields.STATUS),
      (order.RESPCODE = fields.RESPCODE),
      (order.RESPMSG = fields.RESPMSG),
      (order.MERC_UNQ_REF = fields.MERC_UNQ_REF),
      (order.GATEWAYNAME = fields.GATEWAYNAME),
      (order.BANKTXNID = fields.BANKTXNID),
      (order.BANKNAME = fields.BANKNAME),
      (order.isPaid = true);

    const updatePaymentInfo = await order.save();
  } else {
    throw new Error("Order Not found!");
  }
};
// @dec      Create New Order
// @routes   POst /api/orders
// @access   Private
exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @dec      Get order By Id
// @routes   get /api/orders/:id
// @access   Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @dec      Update Order to paid
// @routes   get /api/orders/:id/pay
// @access   Private
exports.updateOrdertoPaid = asyncHandler(async (req, res) => {
  const { amount, email, mobile, orderId, customerName, orderIds } = req.body;

  const totalAmount = JSON.stringify(amount);
  const phoneNumber = JSON.stringify(mobile);
  var params = {};

  /* initialize an array */
  params["MID"] = process.env.MER_ID;
  params["WEBSITE"] = process.env.WEBSITE;
  params["CHANNEL_ID"] = process.env.CHANNEL_ID;
  params["INDUSTRY_TYPE_ID"] = process.env.IND_TYPE;
  params["ORDER_ID"] = orderId;
  params["CUST_ID"] = customerName;
  params["TXN_AMOUNT"] = totalAmount;
  params["CALLBACK_URL"] = "https://shriswastika.com/api/orders/callback";
  params["EMAIL"] = email;
  params["MOBILE_NO"] = phoneNumber;

  setOrderIds(orderIds);

  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    params,
    "e4NgczkaOxpp2h#w"
  );

  paytmChecksum
    .then(function (checksum) {
      let paytmParams = {
        ...params,
        CHECKSUMHASH: checksum,
      };
      res.json(paytmParams);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// @dec      CALL BACK
// @routes   get /api/orders/callback
// @access   Private
exports.checkCallBack = asyncHandler(async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, file) => {
    console.log("ss", fields);
    if (fields.STATUS == "TXN_SUCCESS") {
      updatePaymentInOrder(fields);
      res.redirect("https://www.shriswastika.com/thankyou");
    } else {
      console.log("FAIL");
      res.redirect("https://www.shriswastika.com/");
    }
  });
});

// @dec      Get logged in user order
// @routes   get /api/orders/myorders
// @access   Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update Shipping
// @route   GET /api/orders/:id/shipped
// @access  Private/Admin

exports.updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isShipped = true;
    order.shippedAt = Date.now();

    const updateShippedOrder = await order.save();

    res.json(updateShippedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found!");
  }
});

// @desc    Update Shipping Courier Details
// @route   GET /api/orders/:id/updateCourier
// @access  Private/Admin

exports.updateCourierDetails = asyncHandler(async (req, res) => {
  const { awb_number, courier_name, label, order_id, shipment_id, status } =
    req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    (order.awb_number = awb_number),
      (order.courier_name = courier_name),
      (order.label = label),
      (order.order_id = order_id),
      (order.shipment_id = shipment_id),
      (order.status = status);

    const updateCourier = await order.save();
    res.json(updateCourier);
  } else {
    res.status(404);
    throw new Error("Order Not found!");
  }
});
