// If you meant to use User:
import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems });
        res.json({ success: true, message: "Cart updated successfully" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}