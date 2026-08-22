import request from 'supertest';
import app from '../server';

describe('Attendance API Endpoints', () => {
  describe('GET /api/attendance/today without auth token', () => {
    it('should return 401 Unauthorized when unauthenticated', async () => {
      const response = await request(app).get('/api/attendance/today');
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/attendance/check-in without auth token', () => {
    it('should return 401 Unauthorized when unauthenticated', async () => {
      const response = await request(app).post('/api/attendance/check-in').send({});
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/attendance/check-out without auth token', () => {
    it('should return 401 Unauthorized when unauthenticated', async () => {
      const response = await request(app).post('/api/attendance/check-out').send({});
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });
});
