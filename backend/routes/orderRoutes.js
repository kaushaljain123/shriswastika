const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToShipped,
  updateCourierDetails,
  checkCallBack,
} = require('../controllers/orderController')
const { admin, protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').post(updateOrdertoPaid)
router.route('/callback').post(checkCallBack)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/shipped').put(updateOrderToShipped)
router.route('/:id/updateCourier').put(updateCourierDetails)

module.exports = router
