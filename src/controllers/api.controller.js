const User = require("../models/user")
const getUsersAPI = async (req, res) => {
    const results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}
const postCreateUserAPI = async (req, res) => {
    const { email, name, city } = req.body
    const user = await User.create({
        email, name, city
    })
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}
const putUpdateUserAPI = async (req, res) => {
    const userId = req.body.userId;
    const { email, name, city } = req.body;
    const user = await User.updateOne({ _id: userId }, { email, name, city });
    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}
const deleteUserAPI = async (req, res) => {
    const id = req.body.userId
    const results = await User.deleteOne({ _id: id });
    return res.status(200).json({
        errorCode: 0,
        data: results
    });
}
module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI
}