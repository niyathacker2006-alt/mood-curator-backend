import { Router } from 'express';
import Mood from './mood';
import Recommendation from './recommendation';

const router = Router();

router.get('/moods', async (_req, res) => {
    try {
        const moods = await Mood.find().sort({ group: 1, label: 1 });
        return res.json({ moods });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to load moods', error });
    }
});

router.get('/moods/:slug', async (req, res) => {
    try {
        const mood = await Mood.findOne({ slug: req.params.slug.toLowerCase() });
        if (!mood) {
            return res.status(404).json({ message: 'Mood not found' });
        }

        const recommendations = await Recommendation.find({ moodSlug: mood.slug }).sort({ category: 1, title: 1 });
        const grouped = recommendations.reduce<Record<string, typeof recommendations>>((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});

        return res.json({ mood, recommendations: grouped });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to load mood details', error });
    }
});

router.get('/recommendations', async (req, res) => {
    try {
        const moodSlug = `${req.query.mood || ''}`.toLowerCase();
        const category = `${req.query.category || ''}`.toLowerCase();

        const query: Record<string, string> = {};
        if (moodSlug) {
            query.moodSlug = moodSlug;
        }
        if (category) {
            query.category = category;
        }

        const recommendations = await Recommendation.find(query).sort({ title: 1 });
        return res.json({ recommendations });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to load recommendations', error });
    }
});

export default router;
