import mongoose from 'mongoose';

// Assuming categories are defined elsewhere or fetched from a database
const predefinedCategories = [
  "Vegetables",
  "Fruits",
  "Drinks",
  "Instant",
  "Dairy",
  "Bakery",
  "Grains"
];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number'],
    },
    offerPrice: {
        type: Number,
        required: [true, 'Product offer price is required'],
        min: [0, 'Offer price must be a positive number'],
    },
    image: {
        type: [String],
        required: [true, 'Product images are required'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: predefinedCategories,
    },
    inStock: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
