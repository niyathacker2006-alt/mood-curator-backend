// src/models/types.ts

// The User model for Authentication and Monetization
export interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    tier: 'free' | 'premium'; // Key for monetization logic
    createdAt: Date;
}

// The Journal model (Replacing your LocalStorage objects)
export interface JournalEntry {
    id: string;
    userId: string; // Links this entry to a specific user
    mood: string;
    content: string; // The HTML from your rich text editor
    timestamp: number;
}

// The Recommendation model
export interface Recommendation {
    id: string;
    category: 'movie' | 'music' | 'book' | 'activity';
    mood: string;
    title: string;
    source: string;
    link: string;
}
