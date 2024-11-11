import { Calculator } from '../services/pointsCalculator';

describe('Calculator', () => {
    const calculator = new Calculator();
/**
 * 
 * --------
 * FLIP THE POINTSCALCULATOR FUNCTIONS TO PUBLIC TO TEST THE IDIVIDUAL ITEMS AS THEY ARE CURRENTLY
 * PRIVATE FUNCTIONS 
 * -----------
 */
    // // Test for retailer name alphanumeric characters
    // test('calculateAlphaNumericPoints works correctly', () => {
    //     expect(calculator.calculateAlphaNumericPoints("Target")).toBe(6);
    //     expect(calculator.calculateAlphaNumericPoints("M&M Corner Market")).toBe(14);
    // });

    // // Test for rounded total
    // test('checkRounded works correctly', () => {
    //     expect(calculator.checkRounded("35.00")).toBe(true);
    //     expect(calculator.checkRounded("35.35")).toBe(false);
    // });

    // // Test for total being a multiple of 0.25
    // test('checkMultipleof025 works correctly', () => {
    //     expect(calculator.checkMultipleof025("9.00")).toBe(true);
    //     expect(calculator.checkMultipleof025("35.35")).toBe(false);
    // });

    // // Test for points from every two items
    // test('everytwoitems calculates points correctly', () => {
    //     const items = [
    //         { shortDescription: "Gatorade", price: "2.25" },
    //         { shortDescription: "Gatorade", price: "2.25" },
    //         { shortDescription: "Gatorade", price: "2.25" },
    //         { shortDescription: "Gatorade", price: "2.25" }
    //     ];
    //     expect(calculator.everytwoitems(items)).toBe(10); // 2 pairs = 10 points
    // });

    // // Test for trimmed length description points
    // test('trimmedLengthDesc calculates points correctly', () => {
    //     const items = [
    //         { shortDescription: "Emils Cheese Pizza", price: "12.25" }, // 18 chars, multiple of 3
    //         { shortDescription: "Klarbrunn 12-PK 12 FL OZ", price: "12.00" } // 24 chars, multiple of 3
    //     ];
    //     expect(calculator.trimmedLengthDesc(items)).toBe(6); // 3 + 3 = 6 points
    // });

    // // Test for odd day check
    // test('oddCheck works correctly', () => {
    //     expect(calculator.oddCheck("2022-01-01")).toBe(true); // 1 is odd
    //     expect(calculator.oddCheck("2022-03-20")).toBe(false); // 20 is even
    // });

    // // Test for time check
    // test('timeCheck works correctly', () => {
    //     expect(calculator.timeCheck("14:33")).toBe(true); // Between 2pm and 4pm
    //     expect(calculator.timeCheck("13:01")).toBe(false); // Before 2pm
    //     expect(calculator.timeCheck("16:00")).toBe(false); // After 4pm (4:00 PM is excluded)
    // });

    // Full receipt test cases
    test('calculate points for sample receipt', () => {
        const receipt = {
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
          };

        const points = calculator.calculatePoints(receipt);
        expect(points).toBe(28);
    });

    test('calculate points for sample receipt 2', () => {
        const receipt = {
            "retailer": "M&M Corner Market",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "14:33",
            "items": [
              {
                "shortDescription": "Gatorade",
                "price": "2.25"
              },{
                "shortDescription": "Gatorade",
                "price": "2.25"
              },{
                "shortDescription": "Gatorade",
                "price": "2.25"
              },{
                "shortDescription": "Gatorade",
                "price": "2.25"
              }
            ],
            "total": "9.00"
          };

        const points = calculator.calculatePoints(receipt);
        expect(points).toBe(109);
    });
});