// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db';

// Environment variables should be properly set up in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = '24h';

// Interface definitions
interface JWTPayload {
    userId: string;
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        username: string;
    };
}

// Middleware to verify JWT token
export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }

        const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
        const user = await db.query(
            'SELECT id, email, username FROM users WHERE id = $1',
            [payload.userId]
        );

        if (!user.rows[0]) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        req.user = user.rows[0];
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// Utility functions for authentication
export const authUtils = {
    // Generate JWT token
    generateToken: (user: { id: string; email: string }): string => {
        return jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    },

    // Hash password
    hashPassword: async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    },

    // Verify password
    verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, hashedPassword);
    }
};

// Types for request augmentation
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                username: string;
            }
        }
    }
}

export default { authenticateToken, authUtils };