// Import necessary models and libraries
import Product from "../models/Product.js";
import Order from "../models/order.js";
import User from "../models/User.js";
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use the latest API version
});

// Function to get user orders
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Function to place an order with Cash on Delivery
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, cartItems, address } = req.body;

        // Validate the input data
        if (!address || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Address and cart items are required" });
        }

        // Calculate the total amount
        let amount = await cartItems.reduce(async (accPromise, item) => {
            const acc = await accPromise;
            const product = await Product.findById(item.product);
            return acc + product.offerPrice * item.quantity;
        }, Promise.resolve(0));

        // Add 20% to the amount
        amount += Math.floor(amount * 0.2);

        // Create the order
        await Order.create({
            userId,
            items: cartItems,
            amount,
            address,
            paymentType: "COD",
        });

        // Clear the cart
        await User.findByIdAndUpdate(userId, { cartItems: [] });

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Function to place an order with Stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, cartItems, address } = req.body;

        // Validate the input data
        if (!address || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Address and cart items are required" });
        }

        // Calculate the total amount
        let amount = await cartItems.reduce(async (accPromise, item) => {
            const acc = await accPromise;
            const product = await Product.findById(item.product);
            return acc + product.offerPrice * item.quantity;
        }, Promise.resolve(0));

        // Add 20% to the amount
        amount += Math.floor(amount * 0.2);

        // Create a PaymentIntent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects the amount in cents
            currency: 'usd',
            metadata: { userId, address, cartItems: JSON.stringify(cartItems) },
        });

        // Create the order
        await Order.create({
            userId,
            items: cartItems,
            amount,
            address,
            paymentType: "Stripe",
            paymentIntentId: paymentIntent.id,
        });

        // Clear the cart
        await User.findByIdAndUpdate(userId, { cartItems: [] });

        res.json({
            success: true,
            message: "Order placed successfully",
            clientSecret: paymentIntent.client_secret, // Send client secret to the frontend
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
