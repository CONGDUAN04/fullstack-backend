const connection = require('../config/database')
const getHomepage = (req, res) => {
    return res.render("home.ejs")
}
const postCreateUser = (req, res) => {
    console
}
module.exports = {
    getHomepage, postCreateUser
}