import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    passwordHash: string;
    tier: 'free' | 'premium';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        tier: {
            type: String,
            enum: ['free', 'premium'],
            default: 'free',
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
