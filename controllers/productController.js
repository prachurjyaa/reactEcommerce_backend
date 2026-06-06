const Product = require('../models/product.model');

exports.createProduct = async (req, res, next) => {
  try {
    const { title, price, image, description, category } = req.body;
    if (!title || !price || !image) {
      return res.status(400).json({ msg: 'title, price, and image are required' });
    }
    const product = await Product.create({ title, price, image, description, category });
    res.status(201).json({ msg: 'product saved', product });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ msg: 'product not found' });
    res.status(200).json({ msg: 'product updated', product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ msg: 'product not found' });
    res.status(200).json({ msg: 'product deleted' });
  } catch (error) {
    next(error);
  }
};

exports.bulk = async (req, res, next) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ msg: 'products array is required and must not be empty' });
    }
    const inserted = await Product.insertMany(products);
    res.status(201).json({ msg: `${inserted.length} products inserted successfully`, products: inserted });
  } catch (error) {
    next(error);
  }
};