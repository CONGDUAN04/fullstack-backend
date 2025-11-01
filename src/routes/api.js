import express from 'express';
import {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultipleFilesAPI,
} from '../controllers/api.controller.js';
import { validateImageUpload } from '../middleware/middleware.images.js';
const routerAPI = express.Router();
// Routes
routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', deleteUserAPI);
routerAPI.post('/file', validateImageUpload, postUploadSingleFileAPI);
routerAPI.post('/files', validateImageUpload, postUploadMultipleFilesAPI);
export default routerAPI;
