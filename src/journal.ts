import mongoose, { Document, Schema } from 'mongoose';

export interface IJournal extends Document {
    userId: mongoose.Types.ObjectId;
    mood: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const JournalSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mood: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IJournal>('Journal', JournalSchema);
