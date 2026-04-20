import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Tell TypeScript that our Request object might have a 'user' property now
export interface AuthRequest extends Request {
    user?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Unpack the token using your secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = verified.userId; // Attach the actual MongoDB user ID to the request!
        next(); // Let them pass to the route
    } catch (err) {
        res.status(400).json({ error: 'Invalid or expired token.' });
    }
};