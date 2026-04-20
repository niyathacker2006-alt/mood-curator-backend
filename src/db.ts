import mongoose from 'mongoose';

const defaultUri = 'mongodb://127.0.0.1:27017/moodcurator';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || defaultUri);
        console.log(`MongoDB connected on ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
