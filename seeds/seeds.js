const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Product = require('../models/product.model');
const products = require('../products');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log('db connected');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`${products.length} products seeded`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();