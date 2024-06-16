import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    console.log(token);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}

export default generateToken;