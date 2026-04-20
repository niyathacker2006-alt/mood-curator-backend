"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mood_1 = __importDefault(require("./mood"));
const recommendation_1 = __importDefault(require("./recommendation"));
const router = (0, express_1.Router)();
router.get('/moods', async (_req, res) => {
    try {
        const moods = await mood_1.default.find().sort({ group: 1, label: 1 });
        return res.json({ moods });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to load moods', error });
    }
});
router.get('/moods/:slug', async (req, res) => {
    try {
        const mood = await mood_1.default.findOne({ slug: req.params.slug.toLowerCase() });
        if (!mood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        const recommendations = await recommendation_1.default.find({ moodSlug: mood.slug }).sort({ category: 1, title: 1 });
        const grouped = recommendations.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        return res.json({ mood, recommendations: grouped });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to load mood details', error });
    }
});
router.get('/recommendations', async (req, res) => {
    try {
        const moodSlug = `${req.query.mood || ''}`.toLowerCase();
        const category = `${req.query.category || ''}`.toLowerCase();
        const query = {};
        if (moodSlug) {
            query.moodSlug = moodSlug;
        }
        if (category) {
            query.category = category;
        }
        const recommendations = await recommendation_1.default.find(query).sort({ title: 1 });
        return res.json({ recommendations });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to load recommendations', error });
    }
});
exports.default = router;
