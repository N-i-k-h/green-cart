import express from 'express';
import { register, login, logout, isAuth } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authUser, logout);
router.get('/is-auth', authUser, isAuth);

export default router;