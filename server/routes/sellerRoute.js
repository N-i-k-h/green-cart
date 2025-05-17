// routes/userRouter.js
import express from 'express';
import { register, login, logout, isAuth } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', authUser, logout);
userRouter.get('/isAuth', authUser, isAuth);

export default userRouter;
