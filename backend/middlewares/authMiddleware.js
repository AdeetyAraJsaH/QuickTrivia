import expressAsyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import User from "../models/userModels.js"

export const auth = expressAsyncHandler(async (req, res, next) => {

    let token;
    token = req.cookies.jwt;
    // console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded.userID).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized , Invalid Token !");
        }
    } else {
        res.status(401)
        throw new Error('Not Authorized , No Token found !');
    }
})
