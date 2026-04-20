import mongoose, { Document, Schema } from 'mongoose';

export type RecommendationCategory = 'music' | 'movie' | 'book' | 'activity';

export interface IRecommendation extends Document {
    moodSlug: string;
    category: RecommendationCategory;
    title: string;
    subtitle: string;
    description: string;
    source: string;
    link?: string;
    duration?: string;
    tags: string[];
}

const RecommendationSchema = new Schema<IRecommendation>(
    {
        moodSlug: { type: String, required: true, index: true, trim: true, lowercase: true },
        category: {
            type: String,
            required: true,
            enum: ['music', 'movie', 'book', 'activity'],
        },
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        source: { type: String, required: true, trim: true },
        link: { type: String, trim: true },
        duration: { type: String, trim: true },
        tags: [{ type: String, trim: true }],
    },
    { timestamps: true }
);

export default mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
