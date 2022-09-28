const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        res.status(401)
        throw new Error('No Authorized to access')
    }

    try {
        // Verify token
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoder.id)
        next()
    } catch(err) {
        console.error(err)
        throw new Error('No Authorized to access')
    }
})


exports.admin = (req, res, next) => {
    console.log(req.user)
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}
