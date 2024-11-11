import express from "express";
import { ReceiptController } from "../controllers/receiptController";

const router = express.Router();
const controller = new ReceiptController();

/**
 Endpoint: Process Receipts
Path: /receipts/process
Method: POST
Payload: Receipt JSON
Response: JSON containing an id for the receipt.
 * 
 */
//this does a post to /receipts/process
router.post('/process',controller.processReceipt);

/**
Endpoint: Get Points
Path: /receipts/{id}/points
Method: GET
Response: A JSON object containing the number of points awarded.  
 * 
 */
router.get('/:id/points', controller.getPoints);




export default router;