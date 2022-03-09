import asyncHandler from "express-async-handler";
import Category from '../models/categoryModal.js'

function createCaterories(categories, parentId=null) {
    const cateroryList = []

    let category
    if(parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
        cateroryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCaterories(categories, cate._id)
        })
    }

    return cateroryList
}

// @dec      Create Category
// @routes   POST /api/category/create
// @access   Private/ admin
const addCategorys = asyncHandler(async(req, res) => {
    const categoryObj = {
        name: req.body.name
    }

    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    if(categoryObj && categoryObj.length == 0) {
        res.status(400)
        throw new Error('No Category Item')
    } else {
        const createCate = new Category(categoryObj)

        const createCategory = await createCate.save()
    
        res.status(201).json(createCategory)
    }
})

// @dec      Get Category
// @routes   POST /api/category
// @access   Public
const getCategorys = asyncHandler(async(req, res) => {
    const categorys = await Category.find({})

    if(categorys) {
        const categoryList = createCaterories(categorys)
        res.json(categoryList)
    } else{
        res.status(404).json({ message: 'No category Found' })
    }
})

export { addCategorys, getCategorys }