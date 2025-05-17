import Product from '../models/Product.js';
import { upload } from '../configs/multer.js';

const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category, inStock } = req.body;
    const images = req.files.map(file => file.path);

    const newProduct = new Product({
      name,
      description,
      price,
      offerPrice,
      image: images,
      category,
      inStock: inStock === 'true'
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding product', error: error.message });
  }
};

const productList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};

const productById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};

const changeStock = async (req, res) => {
  try {
    const { inStock } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { inStock }, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Stock updated successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating stock', error: error.message });
  }
};

export { addProduct, productList, productById, changeStock };
