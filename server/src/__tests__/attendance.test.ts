import request from 'supertest';
import app from '../server';

describe('Attendance API Endpoints', () => {
  describe('GET /api/attendance/today without userId', () => {
    it('should return 400 Bad Request when userId is missing', async () => {
      const response = await request(app).get('/api/attendance/today');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/attendance/check-in without userId', () => {
    it('should return 400 Bad Request when userId is missing', async () => {
      const response = await request(app).post('/api/attendance/check-in').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'User ID is required.');
    });
  });

  describe('POST /api/attendance/check-out without userId', () => {
    it('should return 400 Bad Request when userId is missing', async () => {
      const response = await request(app).post('/api/attendance/check-out').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'User ID is required.');
    });
  });
});
