import express, { Router } from "express";
const router = express.Router()
import { addCategorys, getCategorys, getAllCategorys, removeCategory } from "../controllers/categoryController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/create', protect, admin, addCategorys)
router.get('/', getCategorys)
router.get('/all', getAllCategorys)
router.route('/:id').delete(protect, admin, removeCategory)

export default router