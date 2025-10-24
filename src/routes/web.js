const express = require('express')
const { getHomepage, postCreateUser, getCreatePage, getUpdatePage } = require('../controllers/home.controller')
const router = express.Router()
//router.Method('.route',handler)
router.get('/', getHomepage)
router.get('/create', getCreatePage)
router.get('/update/:id', getUpdatePage)
router.post('/create-user', postCreateUser)

module.exports = router;//export default