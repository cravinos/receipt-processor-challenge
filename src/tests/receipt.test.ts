import { ReceiptSchema, validateReceipt } from '../types/receipt';

describe('simple receipt validation', () => {
    it("should pass with valid receipt as data", () => {
        const validReceipt = {
            retailer: "Target",
            purchaseDate: "2023-10-01",
            purchaseTime: "13:45",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        expect(() => validateReceipt(validReceipt)).not.toThrow();
    })
    it('should NOT pass with invalid receipt Retailer name', () => {
        const invalidReceipt = {
            retailer: "",
            purchaseDate: "2023-10-01",
            purchaseTime: "10:10",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        expect(()=> validateReceipt(invalidReceipt)).toThrow("Invalid Receipt: retailer: Retailer cannot be empty")
    })
    it("should NOT pass with invalid receipt as data ERROR = PurchaseTime", () => {
        const invalidReceipt = {
            retailer: "Target",
            purchaseDate: "2023-10-01",
            purchaseTime: "",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        expect(() => validateReceipt(invalidReceipt)).toThrow("Invalid Receipt: purchaseTime: Invalid");
    })
    it("should NOT pass with invalid receipt as data ERROR = PurchaseDate", () => {
        const invalidReceipt = {
            retailer: "Target",
            purchaseDate: "",
            purchaseTime: "14:33",
            items: [{
                shortDescription: "Mountain Dew 12PK",
                price: "6.49"
            }],
            total: "6.49"
        };
        expect(() => validateReceipt(invalidReceipt)).toThrow("Invalid Receipt: purchaseDate: Invalid");
    })
    it("should NOT pass with invalid receipt as data ERROR = items[0].desc is invalid", () => {
        const invalidReceipt = {
            retailer: "Target",
            purchaseDate: "2022-12-12",
            purchaseTime: "14:33",
            items: [{
                shortDescription: "",
                price: "6.49"
            }],
            total: "6.49"
        };
        expect(() => validateReceipt(invalidReceipt)).toThrow("Invalid Receipt: items.0.shortDescription: Description cannot be empty");
    })
    it("should NOT pass with invalid receipt as data ERROR = items[0].price is invalid", () => {
        const invalidReceipt = {
            retailer: "Target",
            purchaseDate: "2022-12-12",
            purchaseTime: "14:33",
            items: [{
                shortDescription: "HELLO WORLD",
                price: ""
            }],
            total: "6.49"
        };
        expect(() => validateReceipt(invalidReceipt)).toThrow("Invalid Receipt: items.0.price: Price must be in format Number 00.00");
    })
    it("should NOT pass with invalid receipt as data ERROR = total is wrong ", () => {
        const invalidReceipt = {
            retailer: "Target",
            purchaseDate: "2022-12-12",
            purchaseTime: "14:33",
            items: [{
                shortDescription: "HELLO WORLD",
                price: "1.00"
            }],
            //invalid string for total needs to be 6.49 / have a trailing second digit 
            total: "6.4"
        };
        expect(() => validateReceipt(invalidReceipt)).toThrow("Invalid Receipt: total: Invalid");
    })
})