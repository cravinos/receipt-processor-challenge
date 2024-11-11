// src/tests/security/receipt.pen.test.ts

import request from 'supertest';
import app from '../../app';

describe('Receipt API Penetration Tests', () => {
  const validReceipt = {
    retailer: "Target",
    purchaseDate: "2022-01-01",
    purchaseTime: "13:01",
    items: [
      { shortDescription: "Mountain Dew 12PK", price: "6.49" }
    ],
    total: "6.49"
  };
  /**
   * NoSQL Injection test
   * Attempts to inject NoSQL operators through input fields
   */
  describe('NoSQL Injection on POST /receipts/process', () => {
    it('should prevent NoSQL injection attempts', async () => {
      const noSqlInjectionPayload = {
        // NoSQL Injection attempt using MongoDB operator,
        // this wont work since we arent using mongoDB or SQL but theoretically This would be in production env
        retailer: { "$ne": "" }, 
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{ shortDescription: "Test Item", price: "5.00" }],
        total: "5.00"
      };

      const response = await request(app)
        .post('/receipts/process')
        .send(noSqlInjectionPayload);

      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid Receipt: retailer: Expected string, received object');
    });
  });

  /**
   * Cross-Site Scripting (XSS) test
   * Attempts to inject JavaScript in text fields
   */
  describe('Cross-Site Scripting (XSS) on POST /receipts/process', () => {
    it('should sanitize input to prevent XSS', async () => {
      const xssPayload = {
        retailer: "<script>alert('XSS')</script>",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{ shortDescription: "<img src=x onerror=alert('XSS')>", price: "5.00" }],
        total: "5.00"
      };

      const response = await request(app)
        .post('/receipts/process')
        .send(xssPayload);

      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid Receipt: retailer: Retailer must only contain alphanumeric characters');
    });
  });

  /**
   * ID Enumeration test
   * Attempts to access points with incremental receipt IDs
   */
  describe('ID Enumeration on GET /receipts/:id/points', () => {
    it('should prevent enumeration of receipt IDs', async () => {
      const invalidId = '000000000000000000000000'; // Random ID that doesnt exist

      const response = await request(app)
        .get(`/receipts/${invalidId}/points`);

      expect(response.status).toBe(404); // Non-existent IDs should return 404
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Error getting 000000000000000000000000 id points are null ');
    });
  });

  /**
   * Unexpected Input Types test
   * Attempts to pass unexpected data types in fields
   */
  describe('Unexpected Input Types on POST /receipts/process', () => {
    it('should reject invalid data types', async () => {
      const unexpectedTypePayload = {
        retailer: 12345, // Integer instead of string
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{ shortDescription: "Invalid Type", price: 5.00 }], // price as number not str
        total: 5.00 // total as number not str
      };

      const response = await request(app)
        .post('/receipts/process')
        .send(unexpectedTypePayload);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid Receipt: retailer: Expected string, received number,items.0.price: Expected string, received number,total: Expected string, received number');
    });
  });

  /**
   * Large Payload test
   * Attempts to overflow API with a large payload
   */
  describe('Large Payload on POST /receipts/process', () => {
    it('should handle large payload with an error', async () => {
      const largePayload = {
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: new Array(10000).fill({ shortDescription: "Bulk Item", price: "1.00" }), 
        total: "10000.00"
      };

      const response = await request(app)
        .post('/receipts/process')
        .send(largePayload);

      // Expecting either 400 or 413 status code
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.status).toBeLessThan(600); 
      expect(response.body).toHaveProperty('error', expect.any(String)); 
    });
  });

  /**
   * HTML Injection test
   * Attempts to inject HTML into fields
   */
  describe('HTML Injection on POST /receipts/process', () => {
    it('should reject HTML tags in input fields', async () => {
      const htmlInjectionPayload = {
        retailer: "<h1>Retailer</h1>",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{ shortDescription: "<div>HTML Injection</div>", price: "10.00" }],
        total: "10.00"
      };

      const response = await request(app)
        .post('/receipts/process')
        .send(htmlInjectionPayload);
      // Should reject HTML content EG <div></div>
      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid Receipt: retailer: Retailer must only contain alphanumeric characters');
    });
  });

});
