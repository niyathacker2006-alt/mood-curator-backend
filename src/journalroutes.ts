import { Router } from 'express';
import Journal from './journal';
import { getTokenPayload } from './auth';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const auth = getTokenPayload(req.headers.authorization);
        if (!auth) {
            return res.status(401).json({ message: 'Missing or invalid token' });
        }

        const { mood, content } = req.body;
        if (!mood || !content) {
            return res.status(400).json({ message: 'mood and content are required' });
        }

        const entry = await Journal.create({
            userId: auth.userId,
            mood,
            content,
        });

        return res.status(201).json({
            message: 'Journal entry saved to MongoDB',
            entry,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to save journal entry', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const auth = getTokenPayload(req.headers.authorization);
        if (!auth) {
            return res.status(401).json({ message: 'Missing or invalid token' });
        }

        const entries = await Journal.find({ userId: auth.userId }).sort({ createdAt: -1 });
        return res.json({ entries });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch journal entries', error });
    }
});

export default router;
