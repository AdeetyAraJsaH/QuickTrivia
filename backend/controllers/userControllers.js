import expressAsyncHandler from "express-async-handler"
import User from "../models/userModels.js"
import generateToken from "../utils/generateToken.js"
import QuizData from "../models/quizModel.js";
import multer from "multer";

// @desc AUTH user / setToken
// @access public
// @route POST api/users/auth

export const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                desc:user.description
            }
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
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } else {
        res.status(400);
        throw new Error({ message: "Invalid User Data !" });
    }
});

// @desc LOGOUT user 
// @access public
// @route POST api/users/logout

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
    const profile = await User.findById(req.user._id);
    const imgBuffer = profile.profilePicture.image;
    const imgBase64 = imgBuffer.toString('base64');
    const avatar = `data:${profile.profilePicture.contentType};base64,${imgBase64}`;
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        desc: req.user.description,
        avatar
    }
    const quizData = req.quizData;
    res.status(200).json({ message: 'User profile.', user, quizData })
})

// @desc UPDATE user profile
// @access private
// @route PUT api/users/profile

export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, desc } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User with this email Exists.")
    }
    const user = await User.findById(req.user._id);
    if (user) {
        const prevEmail = user.email;
        user.name = name || user.name;
        user.email = email || user.email;
        user.desc = desc || user.desc;
        if (req.body.email) {
            await QuizData.updateMany({ email: prevEmail }, {
                $set: { email: email },
            })
                .then(res => {
                    console.log('documents updated');
                })
                .catch(err => { throw new Error(`Error updating Documents. ${err}`) })
        }

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            message: 'Profile Updated',
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                desc: updatedUser.description
            }
        })
    } else {
        res.status(404);
        throw new Error('user Not found');
    }

})

export const updateProfilePicture = expressAsyncHandler(async (req, res) => {
    // console.log(req.user)
    console.log(req.file)
    const img = req.file;
    // res.status(200).json({ message: 'Image uploaded successfully' });

    // Convert image buffer to a format that can be stored in MongoDB
    const image =
    {
        image: new Buffer.from(img.buffer, 'base64'),
        contentType: img.mimetype
    };
    const user = await User.findById(req.user._id);
    if (user) {
        user.profilePicture = image
        // Save imgData to MongoDB...
        const updatedProfilePicture = await user.save()
        res.status(200).json({ data: img, message: 'Image uploaded successfully' });
    } else {
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

export const saveQuiz = expressAsyncHandler(async (req, res) => {
    const { createdAt, details, email, questions, Result } = req.body;
    // console.log(req.body);
    // console.log(`${createdAt} ${email} ${details} ${questions} ${Result}`);
    const quiz = await QuizData.create({
        createdAt,
        details,
        email,
        questions,
        Result
    });
    res.status(201).json({ message: "Quiz Saved." })
})