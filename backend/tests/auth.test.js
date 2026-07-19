import request from 'supertest';
import app from '../src/app.js';

// Mock the auth service to avoid DB calls
jest.mock('../services/authService.js', () => ({
  registerUser: jest.fn().mockResolvedValue({ insertId: 1 }),
  loginUser: jest.fn().mockResolvedValue({
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken',
    user: { id: 1, email: 'test@example.com' },
  }),
}));

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'test@example.com', password: 'Password123' })
      .expect(201);
    expect(res.body).toHaveProperty('message', 'User registered. Verification email sent.');
    expect(res.body).toHaveProperty('userId', 1);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'Password123' })
      .expect(200);
    expect(res.body).toHaveProperty('accessToken', 'testAccessToken');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });
});
