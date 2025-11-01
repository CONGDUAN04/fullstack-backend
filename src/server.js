import dotenv from 'dotenv';
dotenv.config();
import express, { json, urlencoded } from 'express';
import configViewEngine from './config/viewEngine.js';
import fileUpload from 'express-fileupload';
import webRoutes from './routes/web.js';
import apiRoutes from './routes/api.js';
import customerRoutes from './routes/customer.js';
import connection from './config/database.js';
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

// Self-invoking async function
(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(` Backend app listening on http://${hostname}:${port}`);
        });
    } catch (error) {
        console.error(' ERROR connect to DB:', error);
    }
})();
