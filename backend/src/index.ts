import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { db } from './db';
import authRouter from './routes/auth';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Backend API v2 running',
    version: '1.3',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint with DB status
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await db.query('SELECT NOW()');
    res.json({
      status: 'ok',
      database: 'connected!',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected!',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
});

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;