import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
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
        console.error(error)
        throw new Error('No Authorized to access')
    }
})

export { protect }