import express from 'express';
import {
    getHomepage,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser
} from '../controllers/home.controller.js';

const router = express.Router();

// router.Method('route', handler)
router.get('/', getHomepage);
router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);
router.post('/create-user', postCreateUser);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/:id', postDeleteUser);

export default router;
