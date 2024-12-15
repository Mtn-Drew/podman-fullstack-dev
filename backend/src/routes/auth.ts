import { Router, Request, Response, RequestHandler, NextFunction } from 'express';
import { db } from '../db';
import { authenticateToken, authUtils } from '../middleware/auth';
import { ParsedQs } from 'qs';

// Define interface for authenticated request
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        username: string;
    };
}

const router = Router();

// Define interfaces for request bodies
interface RegisterRequestBody {
    email: string;
    username: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

// Define custom RequestHandler types
type RegisterHandler = RequestHandler<
    {}, // params
    any, // response
    RegisterRequestBody, // request body
    ParsedQs, // query strings
    Record<string, any> // locals
>;

type LoginHandler = RequestHandler<
    {},
    any,
    LoginRequestBody,
    ParsedQs,
    Record<string, any>
>;

type AuthenticatedRequestHandler = RequestHandler<
    {},
    any,
    any,
    ParsedQs,
    Record<string, any>
> & {
    (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> | void;
};

// Register new user
router.post('/register', (async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // Check if user exists
        const userExists = await db.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );
        
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email or username already exists' });
        }

        // Hash password and create user
        const hashedPassword = await authUtils.hashPassword(password);
        const result = await db.query(
            `INSERT INTO users (email, username, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, email, username`,
            [email, username, hashedPassword]
        );

        const user = result.rows[0];
        const token = authUtils.generateToken(user);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Error creating user' });
    }
}) as RegisterHandler);

// Login user
router.post('/login', (async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await authUtils.verifyPassword(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        await db.query(
            'UPDATE users SET last_login = NOW() WHERE id = $1',
            [user.id]
        );

        // Generate token
        const token = authUtils.generateToken(user);

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Error during login' });
    }
}) as LoginHandler);

// Get current user profile
router.get('/me', authenticateToken, ((req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    res.json({ user: req.user });
}) as AuthenticatedRequestHandler);

export default router;