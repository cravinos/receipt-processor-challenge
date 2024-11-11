import { Receipt } from '../types/receipt';

export class Calculator {
    calculatePoints(receipt:Receipt): number {
        let points =0;

        // 1) calculates retailer length w/o non alphanumeric chars and adds to points 
        points += this.calculateAlphaNumericPoints(receipt.retailer);

        // 2) adds 50 points if checkRounded returns true, 
        if(this.checkRounded(receipt.total)){
            points += 50;
        }
        
        //3) if checkmultipleof025 returns true, add 25pts 
        //function 2 holds true for this statement too, i just added it in to show I know. 
        if(this.checkMultipleof025(receipt.total)){
            points+=25;
        }

        //4 adds the amount of points from modding the items array length 
        points += this.everytwoitems(receipt.items);

        //5, checks trimmed length (alrdy done in input validation) then checks if mutliple of 3, if so multis by 1.2 total and then rounds up 
        points += this.trimmedLengthDesc(receipt.items);

        //6 +6 points if the day in which the purchase was made is odd
        if(this.oddCheck(receipt.purchaseDate)){
            points +=6;
        }

        //7 +10 points if time is between 2pm and 4pm 
        if (this.timeCheck(receipt.purchaseTime)){
            points +=10;
        }

        return points;
    }
//function 1: One point for every alphanumeric character in the retailer name.
 private calculateAlphaNumericPoints (retailer:string):number {
    //take retailer string and return number type of length when all values non alphanumeric are replaced
    return retailer.replace(/[^a-zA-Z0-9]/g,'').length;
 }

//function 2, audit if total is a round dollar with no cents
private checkRounded (total:string):boolean {
    return total.endsWith('.00');
}
//function 3, if the total when converted to number mod 0.25 is 0 then return true
private checkMultipleof025 (total:string): boolean {
    return Number(total)%0.25===0;
}

//function 4, mod the length of the items array 
private everytwoitems (items:Receipt["items"]):number {
    return Math.floor(items.length/2)*5;
}

//function 5, if the trimmed length is multiple of 3 increase the points by 0.2x and round up. 
private trimmedLengthDesc (items:Receipt["items"]):number {
    return items.reduce((points, item)=> {
        if(item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price)*0.2);
        }
        return points;
    },0);
}

//function 6, check if the day in which the purchase was made is odd 
private oddCheck (purchaseDate:string):boolean { 
    let date = purchaseDate.slice(-2);
    return Number(date)%2===1;
}

//function 7, check if time purchased was between 2pm and 4pm not including 2pm and 4pm 
private timeCheck(purchaseTime:string):boolean { 
    let hours = Number(purchaseTime.slice(0,2));
    let minutes = Number(purchaseTime.slice(-2));
    if((hours === 14 && minutes !==0 )|| (hours === 15 && minutes !==0)){
        return true;
    } else {
        return false;
    }
}


}