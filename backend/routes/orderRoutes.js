import express from "express";
const router = express.Router()
import { addOrderItems, getOrderById, updateOrdertoPaid, getMyOrders, getOrders, updateOrderToDelivered, updateOrderToShipped, updateCourierDetails } from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrdertoPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/shipped').put(updateOrderToShipped)
router.route('/:id/updateCourier').put(updateCourierDetails)

export default router