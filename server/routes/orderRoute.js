import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

// Route for placing an order with Cash on Delivery
orderRouter.post('/cod', authUser, placeOrderCOD);

// Route for placing an order with Stripe
orderRouter.post('/stripe', authUser, placeOrderStripe);

// Route for getting user orders
orderRouter.get('/user', authUser, getUserOrders);

// Route for getting seller orders
orderRouter.get('/seller', authSeller, getUserOrders);

export default orderRouter;
