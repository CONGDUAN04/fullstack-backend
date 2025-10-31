require('dotenv').config()
const express = require('express') //commonjs
const configViewEngine = require('./config/viewEngine')
const fileUpload = require("express-fileupload");
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const connection = require('./config/database')
const mongoose = require("mongoose")
// Get the client
const app = express() //app express\
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME
//config file upload
app.use(fileUpload())
//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//config template engine
configViewEngine(app)
//Khai báo route 
app.use('/', webRoutes);
app.use('/api/', apiRoutes);
//js self running function
(async () => {
    //test connection
    try {
        await connection()
        app.listen(port, hostname, () => {
            console.log(`Backend app listening on port ${port}`)
        })
    } catch (error) {
        console.log("ERROR connect to DB:", error)
    }
})()

