import expressAsyncHandler from "express-async-handler"
import User from "../models/userModels.js"

// @desc AUTH user / setToken
// @access public
// @route POST api/users/auth

export const authUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth User' })
})

// @desc REGISTER a new user 
// @access public
// @route POST api/users/

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already Exists.")
    }
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            password: user.password
        });
    } else {
        res.status(400);
        throw new Error({ message: "invalid User Data !" });
    }
});

// @desc LOGOUT user 
// @access public
// @route POST api/users/auth

export const logoutUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User logged out' })
})

// @desc GET user profile
// @access private
// @route GET api/users/profile

export const getUserProfile = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User profile.' })
})

// @desc UPDATE user profile
// @access private
// @route PUT api/users/profile

export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User profile.' })
})