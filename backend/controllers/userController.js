const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')
const Order = require('../models/orderModal')
const Otp = require('../models/otpModel')
const { generateToken } = require("../utils/generateToken")
const nodemailer = require('nodemailer')
const e = require("express")
// @dec      Auth user & get token
// @routes   POST /api/users/login
// @access   PUBLIC
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// @dec      Create User
// @routes   POST /api/users
// @access   PUBLIC
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @dec      Get user profile
// @routes   Get /api/users/profile
// @access   PRIVATE
exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @dec      Update user profile
// @routes   PUT /api/users/profile
// @access   PRIVATE
exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin, token: generateToken(updatedUser._id) })

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @dec      Get all users
// @routes   Get /api/users
// @access   PRIVATE/Admin
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})

// @dec      Delete User
// @routes   Delete /api/users/:id
// @access   PRIVATE/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User Removed' })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @dec      Get user by id 
// @routes   Get /api/users/:id
// @access   PRIVATE/Admin
exports.getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @dec      Update user
// @routes   PUT /api/users/:id/edit
// @access   PRIVATE/Admin
exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin })

    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @dec      Send Email
// @routes   PUT /api/users/email-send
// @access   Public
exports.emailSend = asyncHandler(async (req, res) => {
    let data = await User.findOne({ email: req.body.email });

    if (data) {
        let optCode = Math.floor((Math.random() * 10000) + 1);
        let otpData = new Otp({
            email: req.body.email,
            code: optCode,
            expireIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = await otpData.save();
        sendEmail(otpResponse)
        res.json({ status: true, data: otpResponse, message: 'Email send Please check Your Email' })
    } else {
        res.json({ status: false, message: 'User Not Found With This Email ID' })
    }
})

// @dec      Change Password
// @routes   POST /api/users/changePassword
// @access   PRIVATE
exports.changePassword = asyncHandler(async (req, res) => {
    const data = await Otp.findOne({ email: req.body.email })
    console.log(data)
    if (data) {
        let currentTime = new Date().getTime()
        let diff = data.expireIn - currentTime
        if (diff < 0) {
            res.json({ status: false, message: 'Your Code is is Expire Please Apply Again!' })
            await data.remove()
        } else {
            if (data.code == req.body.code) {
                let user = await User.findOne({ email: req.body.email })
                user.password = req.body.password
                user.save()
                res.json({ status: true, message: 'Your Password is Successfuly Updated' })
                await data.remove()
            } else {
                res.json({ status: false, message: 'Your Otp is Incorrect Please check or Send Again' })
            }
        }
    } else {
        res.json({ status: false, message: 'Email and Code Is Not Found' })
    }
})

// @dec      Delete Pending Order
// @routes   Delete /api/users/orders/:id
// @access   PRIVATE/Admin
exports.deletePendingOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ status: true, message: 'Order Remove Successfully!' })
    } else {
        res.status(404)
        throw new Error('Order Not Found!')
    }
})
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: "jainkaushal123456@gmail.com", // generated ethereal user
            pass: "dyqhjrobaedoypvk", // generated ethereal password
        },
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: 'Change Password OTP',
        text: `Your Otp is ${options.code} is Expired in ${options.expireIn}`,
    };

    const info = await transporter.sendMail(message);
};