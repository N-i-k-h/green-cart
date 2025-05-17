import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        await Address.create({ userId, ...address });
        res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
