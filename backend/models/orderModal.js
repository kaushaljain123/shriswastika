const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, require: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isShipped: {
      type: Boolean,
      required: true,
      default: false,
    },
    shippedAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    awb_number: {
      type: String,
    },
    courier_name: {
      type: String,
    },
    label: {
      type: String,
    },
    order_id: {
      type: String,
    },
    shipment_id: {
      type: String,
    },
    status: {
      type: String,
    },
    deliveredAt: {
      type: Date,
    },
    ORDERID: {
      type: String,
    },
    TXNID: {
      type: String,
    },
    TXNAMOUNT: {
      type: String,
    },
    PAYMENTMODE: {
      type: String,
    },
    CURRENCY: {
      type: String,
    },
    TXNDATE: {
      type: String,
    },
    STATUS: {
      type: String,
    },
    RESPCODE: {
      type: String,
    },
    RESPMSG: {
      type: String,
    },
    MERC_UNQ_REF: {
      type: String,
    },
    GATEWAYNAME: {
      type: String,
    },
    BANKTXNID: {
      type: String,
    },
    BANKNAME: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
