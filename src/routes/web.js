const express = require('express')
const { getHomepage, postCreateUser } = require('../controllers/home.controller')
const router = express.Router()
//router.Method('.route',handler)
router.get('/', getHomepage)
router.post('/create-user', postCreateUser)
module.exports = router;//export default