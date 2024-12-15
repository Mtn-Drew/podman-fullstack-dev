import request from 'supertest';
import app from '../index';
import pool from '../config/database';

// Mock the database pool
jest.mock('../config/database', () => ({
  connect: jest.fn().mockImplementation(() => Promise.resolve({
    query: jest.fn().mockResolvedValue({ rows: [] }),
    release: jest.fn()
  })),
  on: jest.fn(),
  end: jest.fn().mockImplementation(() => Promise.resolve())
}));

describe('Health Check Endpoint', () => {
  beforeEach(() => {
    // Clear mock data before each test
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should return status ok when database is connected', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('database', 'connected');
  });

  it('should handle database connection errors', async () => {
    const mockConnect = pool.connect as jest.Mock;
    mockConnect.mockRejectedValueOnce(new Error('DB Error'));
    
    const response = await request(app).get('/health');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('database', 'disconnected');
  });
});