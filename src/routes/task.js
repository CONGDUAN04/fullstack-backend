import express from 'express';
import { postCreateTask, getAllTask, deleteTask, putUpdateTask } from '../controllers/task.controller.js';
const routerTaskAPI = express.Router();
// Routes
routerTaskAPI.post('/tasks', postCreateTask);
routerTaskAPI.get('/tasks', getAllTask);
routerTaskAPI.delete('/tasks', deleteTask);
routerTaskAPI.put('/tasks', putUpdateTask);
export default routerTaskAPI;
