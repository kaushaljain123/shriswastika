const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        unique: false
    },
    code: {
        type: String,
    },
    expireIn: {
        type: Number,
    },
}, {
    timestamps: true
})

const otp = mongoose.model('otp', otpSchema, 'otp')

module.exports = otp 