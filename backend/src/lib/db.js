import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB at ${conn.connection.host}:${conn.connection.port}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

