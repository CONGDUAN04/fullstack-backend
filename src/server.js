import dotenv from 'dotenv';
dotenv.config();
import express, { json, urlencoded } from 'express';
import configViewEngine from './config/viewEngine.js';
import fileUpload from 'express-fileupload';
import webRoutes from './routes/web.js';
import apiRoutes from './routes/api.js';
import projectRoutes from './routes/project.js';
import customerRoutes from './routes/customer.js';
import connection from './config/database.js';
import { MongoClient } from 'mongodb';
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// Config file upload
app.use(fileUpload());

// Config req.body
app.use(json());
app.use(urlencoded({ extended: true }));

// Config template engine
configViewEngine(app);

// Routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/api/v1', customerRoutes);
app.use('/api/v2', projectRoutes);
// Self-invoking async function
(async () => {
    try {
        //using mongoose
        await connection();
        //using mongodb
        // Connection URL
        const url = process.env.DB_HOST_WITH_DRIVER;
        const client = new MongoClient(url);
        // Database Name
        const dbName = process.env.DB_NAME;
        await client.connect();
        console.log('Connected successfully to server');
        app.listen(port, hostname, () => {
            console.log(`Backend app listening on http://${hostname}:${port}`);
        });
    } catch (error) {
        console.error(' ERROR connect to DB:', error);
    }
})();
