const asyncHandler = require("express-async-handler")
const Product = require("../models/productModal")
const excel = require('exceljs')
const readXlsxFile = require("read-excel-file/node");

const uploadFile = (path) => {

}

exports.uploadXlxsData = asyncHandler(async (req, res) => {
    try {
        let path = __basedir + "/xlxsUpload/" + req.file.filename;
        readXlsxFile(path).then((rows) => {
            rows.shift();
            var products = []
            rows.forEach((row) => {
                let product = {
                    _id: row[0],
                    name: row[1],
                    brand: row[2],
                    description: row[3],
                    price: row[4],
                    mrp: row[5],
                    stocks: row[6]
                };

                products.push(product);
                console.log(product)
                return
            })

            products.map(async (a) => {
                const findProduct = await Product.find({ _id: JSON.parse(a._id) })
                if (findProduct) {
                    await Product.updateMany({ _id: JSON.parse(a._id) }, { $set: { name: a.name, brand: a.brand, description: a.description, price: a.price, mrp: a.mrp, countInStock: a.stocks } })
                    return res.send('Product Update SuccessFully')
                } else {
                    console.log('Sorry Product Not Found!')
                }
            })
        })
    } catch (error) {
        console.log('Server Error')
    }
}) 