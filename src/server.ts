import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import journalRoutes from './journalroutes';
import authRoutes from './authroutes';
import contentRoutes from './contentroutes';
import connectDB from './db';
import { seedWellnessData } from './seedData';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api', contentRoutes);

app.get('/api/health', (req, res) =>
    res.json({
        message: 'Backend is online',
        database: 'MongoDB',
        port: process.env.PORT || 5000,
    })
);

app.get('/', (req, res) => res.send('Backend is Online and Verified!'));

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
    await seedWellnessData();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
