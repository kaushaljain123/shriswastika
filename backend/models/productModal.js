const mongoose  = require("mongoose")

const reviewSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name : { type : String, required: true },
    rating : { type : Number, required: true },
    comment : { type : String, required: true },
}, {
    timestamps : true
})

const productSchema = mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true,
    },
    imageTwo: {
        type : String,
    },
    imageThree: {
        type: String,
    },
    videoLink : {
        type: String,
    },
    brand : {
        type : String,
        required : true
    },
    category : {
        type : String,
    },
    subCategory : {
        type: String
    },
    description : {
        type : String,
        required : true,
    },
    reviews: [reviewSchema],
    rating : {
        type : Number,
        required : true,
        default : 0
    },
    numReviews : {
        type : Number,
        required : true,
        default : 0
    },
    mrp: {
        type: Number,
        required: true,
        default: 0
    },
    price : {
        type : Number,
        required : true,
    },
    countInStock : {
        type : Number,
        required : true,
    },
}, {
    timestamps : true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product 