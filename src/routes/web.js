const express = require('express')
const { getHomepage } = require('../controllers/home.controller')
const router = express.Router()
//router.Method('.route',handler)
router.get('/', getHomepage)

module.exports = router;//export default