require('dotenv').config()
const express = require('express') //commonjs
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')
const mongoose = require("mongoose")
// Get the client
const app = express() //app express\
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME
//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//config template engine
configViewEngine(app)
//Khai báo route 
app.use('/', webRoutes);

const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'CongDuan' });
silence.save();

//js self running function
(async () => {
    //test connection
    try {
        await connection()
        app.listen(port, hostname, () => {
            console.log(`Backendapp listening on port ${port}`)
        })
    } catch (error) {
        console.log("ERROR connect to DB:", error)
    }
})()

