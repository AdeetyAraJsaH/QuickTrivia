import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}

export default generateToken;