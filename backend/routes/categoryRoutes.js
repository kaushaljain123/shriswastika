import express, { Router } from "express";
const router = express.Router()
import { addCategorys, getCategorys } from "../controllers/categoryController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/create', protect, admin, addCategorys)
router.get('/', getCategorys)

export default router