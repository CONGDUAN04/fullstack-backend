const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById } = require('../services/CRUD.services')
const getHomepage = async (req, res) => {
    const results = await getAllUsers();
    return res.render("home.ejs", {
        users: results
    })
}
const postCreateUser = async (req, res) => {
    const { email, name, city } = req.body
    const [result, fields] = await connection.query(
        `INSERT INTO Users (email,name,city)VALUES(?, ?, ?) `, [email, name, city],
    )
    res.redirect('/')

}
const getCreatePage = (req, res) => {
    res.render('create.ejs')
}
const getUpdatePage = async (req, res) => {
    const id = req.params.id
    const user = await getUserById(id)
    res.render('edit.ejs', { user: user }) // x <- y
}
const postUpdateUser = async (req, res) => {
    const userId = req.body.userId
    const { email, name, city } = req.body
    await updateUserById(email, city, name, userId)
    res.redirect('/')
}
const postDeleteUser = async (req, res) => {
    const id = req.params.id
    console.log("Check id", id)
    const [result, fields] = await connection.query(
        `DELETE FROM Users WHERE id = ?`, [id]
    )
    res.redirect('/')
}
module.exports = {
    getHomepage, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser
}