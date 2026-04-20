import jwt from 'jsonwebtoken';

export type AuthPayload = {
    userId: string;
    email: string;
};

export const getTokenPayload = (authHeader?: string): AuthPayload | null => {
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];

    try {
        return jwt.verify(
            token,
            process.env.JWT_SECRET || 'development_secret'
        ) as AuthPayload;
    } catch {
        return null;
    }
};
