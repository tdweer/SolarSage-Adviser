
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {

    //verify authentification
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Auth token required" })
    }
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        const user = await User.findOne({ _id });
        if (user) {
            delete user.password
        }
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "request not authorized" })

    }
}

module.exports = requireAuth