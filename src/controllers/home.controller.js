const connection = require('../config/database')
const { getAllUsers, getUserById } = require('../services/CRUD.services')
const getHomepage = async (req, res) => {
    const results = await getAllUsers();
    return res.render("home.ejs", {
        users: results
    })
}
const postCreateUser = async (req, res) => {
    const { email, myname, city } = req.body
    const [result, fields] = await connection.query(
        `INSERT INTO Users (email,name,city)VALUES(?, ?, ?) `, [email, myname, city],
    )
    console.log("<<Check results", result)
    res.send("create User Succeed")

}
const getCreatePage = (req, res) => {
    res.render('create.ejs')
}
const getUpdatePage = async (req, res) => {
    const id = req.params.id
    const user = await getUserById(id)
    res.render('edit.ejs', { user: user }) // x <- y
}


module.exports = {
    getHomepage, postCreateUser, getCreatePage, getUpdatePage
}