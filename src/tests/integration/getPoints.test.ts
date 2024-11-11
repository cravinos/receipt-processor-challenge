import request from 'supertest';
import app from '../../app';
import { responsiveProperty } from '@mui/material/styles/cssUtils';

describe('getPoints integration tests', () => {
    // receipt:
    const validReceipt = {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
          {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
          },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
          },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
          },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
          },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
          }
        ],
        "total": "35.35"
      }

      it('should prcess receipt and return correct point count ', async () => {
        //process receipt 
        const Response = await request(app)
      .post('/receipts/process')
      .send(validReceipt);

        expect(Response.status).toBe(200);
         const {id} = Response.body;
         //getPoints
         const ResponsePoints = await request(app).get(`/receipts/${id}/points`);
         expect(ResponsePoints.status).toBe(200);
         expect(ResponsePoints.body).toHaveProperty('points');
         expect(typeof ResponsePoints.body.points).toBe('number');
         expect(ResponsePoints.body.points).toBe(28)
      })

      it('should return error for fake receipt', async () => {
        const response = await request(app)
          .get('/receipts/fake-id/points');
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          error: 'Error getting fake-id id points are null '
        });
      });
    
      it('should handle malformed receipt IDs', async () => {
        const response = await request(app)
          .get('/receipts/:{id}/points');
    
        expect(response.status).toBe(404);
      });

})
