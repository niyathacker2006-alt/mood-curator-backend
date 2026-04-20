"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journal_1 = __importDefault(require("./journal"));
const auth_1 = require("./auth");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const auth = (0, auth_1.getTokenPayload)(req.headers.authorization);
        if (!auth) {
            return res.status(401).json({ message: 'Missing or invalid token' });
        }
        const { mood, content } = req.body;
        if (!mood || !content) {
            return res.status(400).json({ message: 'mood and content are required' });
        }
        const entry = await journal_1.default.create({
            userId: auth.userId,
            mood,
            content,
        });
        return res.status(201).json({
            message: 'Journal entry saved to MongoDB',
            entry,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to save journal entry', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const auth = (0, auth_1.getTokenPayload)(req.headers.authorization);
        if (!auth) {
            return res.status(401).json({ message: 'Missing or invalid token' });
        }
        const entries = await journal_1.default.find({ userId: auth.userId }).sort({ createdAt: -1 });
        return res.json({ entries });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch journal entries', error });
    }
});
exports.default = router;
