import expressAsyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import User from "../models/userModels.js"
import QuizData from "../models/quizModel.js"

export const auth = expressAsyncHandler(async (req, res, next) => {

    let token;
    token = req.cookies.jwt;
    // console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            req.user = await User.findById(decoded.userID).select('-password');
            if (req.user.email) {
                const email = req.user.email
                // console.log(req.user.email);
                req.quizData = await QuizData.find({ email }, { _id: 1, details: 1, createdAt: 1, Result: 1 });
            }
            next();
        } catch (error) {
            res.status(401)
            console.log(error);
            // throw new Error("Not Authorized , Invalid Token !");
        }
    } else {
        res.status(401)
        throw new Error('Not Authorized , No Token found !');
    }
})
