import expressAsyncHandler from "express-async-handler"
import User from "../models/userModels.js"
import generateToken from "../utils/generateToken.js"

// @desc AUTH user / setToken
// @access public
// @route POST api/users/auth

export const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials !");
    }
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
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error({ message: "Invalid User Data !" });
    }
});

// @desc LOGOUT user 
// @access public
// @route POST api/users/auth

export const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out' })
})

// @desc GET user profile
// @access private
// @route GET api/users/profile

export const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json({ message: 'User profile.', user })
})

// @desc UPDATE user profile
// @access private
// @route PUT api/users/profile

export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            message: 'Updated User profile.',
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404);
        throw new Error('user Not found');
    }

})