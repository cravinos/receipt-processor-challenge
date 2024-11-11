import { v4 as uuidv4 } from 'uuid';
import { Receipt } from '../types/receipt';
import { Calculator } from './pointsCalculator';

export class ReceiptService {
    private receipts: Map<string, Receipt>;
    private Calculator: Calculator;

    constructor() {
        this.receipts = new Map();
        this.Calculator = new Calculator();
    }

    generateId(receipt:Receipt):string {
        const id = uuidv4();
        this.receipts.set(id,receipt);
        return id;
    }

    getPoints(id:string):number | null{
        const receipt = this.receipts.get(id);
        if(!receipt) return null;
        return this.Calculator.calculatePoints(receipt);
    }
}