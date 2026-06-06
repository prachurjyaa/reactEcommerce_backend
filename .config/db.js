const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('URL:', process.env.MONGODBURL?.substring(0, 30) + '...');
        
        await mongoose.connect(process.env.MONGODBURL, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('✓ Connected to MongoDB successfully');
    } catch (error) {
        console.error('✗ MongoDB Connection Error:', error.message);
        console.error('Error Code:', error.code);
        throw error;
    }
};

module.exports = connectDB;   