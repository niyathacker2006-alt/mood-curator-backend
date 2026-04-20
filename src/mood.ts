import mongoose, { Document, Schema } from 'mongoose';

export interface IMood extends Document {
    slug: string;
    label: string;
    emoji: string;
    group: string;
    description: string;
    affirmation: string;
    journalPrompt: string;
    accent: string;
    gradientFrom: string;
    gradientTo: string;
    rituals: string[];
}

const MoodSchema = new Schema<IMood>(
    {
        slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
        label: { type: String, required: true, trim: true },
        emoji: { type: String, required: true, trim: true },
        group: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        affirmation: { type: String, required: true, trim: true },
        journalPrompt: { type: String, required: true, trim: true },
        accent: { type: String, required: true, trim: true },
        gradientFrom: { type: String, required: true, trim: true },
        gradientTo: { type: String, required: true, trim: true },
        rituals: [{ type: String, required: true, trim: true }],
    },
    { timestamps: true }
);

export default mongoose.model<IMood>('Mood', MoodSchema);
