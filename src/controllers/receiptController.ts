import { ReceiptService } from "../services/receiptService";
import express from 'express';
import { validateReceipt } from "../types/receipt";

export class ReceiptController {
    private receiptService: ReceiptService;

    constructor(receiptService?: ReceiptService) {
        this.receiptService = receiptService || new ReceiptService();
    }

    //for testing
    setReceiptService(service:ReceiptService){
        this.receiptService=service;
    }

    //here we are generating a new receipt 
    processReceipt = async (req: express.Request, res: express.Response) => {
        try {
            //validate new receipt 
            const validatedReceipt = validateReceipt(req.body);
            //process receipt when valid and get an id generated from it from receiptservice
            const id = this.receiptService.generateId(validatedReceipt);

            //return id 
            res.status(200).json({id});
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message: "Invalid receipt"
            })
        }
    }

    //get points 
    getPoints = async(req:express.Request, res:express.Response) => {
        const {id} = req.params;
        try {
            const points = this.receiptService.getPoints(id);
            if(points === null){
                res.status(404).json({
                    error: `Error getting ${id} id points are null `
                })
                return;
            }
            res.status(200).json({points});
        } catch (error) {
            res.status(500).json({
                error: `Error getting points for ${id}`
            })
        }
    }
}