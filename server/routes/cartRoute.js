import express from 'express';
import { updateCart } from '../controllers/cartController.js';
import authUser from '../middlewares/authUser.js';

// Use express.Router() instead of mongoose.Router()
const cartRouter = express.Router();

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;