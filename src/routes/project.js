import express from 'express';
import { postCreateProject, getAllProject, deleteProject, putUpdateProject } from '../controllers/project.controller.js';
const routerProjectAPI = express.Router();
// Routes
routerProjectAPI.post('/projects', postCreateProject);
routerProjectAPI.get('/projects', getAllProject);
routerProjectAPI.delete('/projects', deleteProject);
routerProjectAPI.put('/projects', putUpdateProject);
export default routerProjectAPI;
