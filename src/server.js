require('dotenv').config()
const express = require('express') //commonjs
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')
// Get the client
const app = express() //app express\
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME
//config template engine
configViewEngine(app)
//Khai báo route 
app.use('/', webRoutes)
//test connection

// A simple SELECT query
connection.query(
    'select * from Users',
    function (err, results, fields) {
        console.log("check results:", results)
        console.log("check fields:", fields)
    }
)
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
