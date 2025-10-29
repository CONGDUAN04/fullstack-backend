const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById } = require('../services/CRUD.services')
const User = require("../models/user")
const getHomepage = async (req, res) => {
    const results = await User.find({});
    return res.render("home.ejs", {
        users: results
    })
}
const postCreateUser = async (req, res) => {
    const { email, name, city } = req.body
    await User.create({
        email, name, city
    })
    res.redirect('/')
}
const getCreatePage = (req, res) => {
    res.render('create.ejs')
}
const getUpdatePage = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id).exec();
    res.render('edit.ejs', { user: user }) // x <- y
}
const postUpdateUser = async (req, res) => {
    const userId = req.body.userId;
    const { email, name, city } = req.body;
    await User.updateOne({ _id: userId }, { email, name, city });
    res.redirect('/')
}
const postDeleteUser = async (req, res) => {
    const id = req.params.id
    await User.deleteOne({ _id: id });
    res.redirect('/')
}
module.exports = {
    getHomepage, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser
}