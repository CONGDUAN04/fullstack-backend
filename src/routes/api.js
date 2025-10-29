const express = require('express')
const routerAPI = express.Router()
const { getUsersAPI } = require("../controllers/api.controller")
//router.Method('.route',handler)
routerAPI.get('/users', getUsersAPI)
module.exports = routerAPI;//export default