const express = require("express")
const router = express.Router()
const { addCategorys, getCategorys, getAllCategorys, removeCategory } = require("../controllers/categoryController")
const { protect, admin } = require('../middleware/authMiddleware')

router.post('/create', protect, admin, addCategorys)
router.get('/', getCategorys)
router.get('/all', getAllCategorys)
router.route('/:id').delete(protect, admin, removeCategory)

module.exports = router