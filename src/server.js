const express = require('express') //commonjs
// import express from 'express' //es modules
require('dotenv').config()
const path = require('path')

const app = express() //app express
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME
//config template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Khai báo route
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/abc', (req, res) => {
    res.send('Hello abc ')
})
app.get('/duan', (req, res) => {
    res.render('sample.ejs')
})
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
