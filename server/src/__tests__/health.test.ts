import request from 'supertest';
import app from '../server';

describe('API Route Integration Tests', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Welcome');
    });
  });

  describe('GET /api/health', () => {
    it('should return service health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('service', 'odoo-X-nmit-backend');
      expect(response.body).toHaveProperty('database');
    });
  });
});
