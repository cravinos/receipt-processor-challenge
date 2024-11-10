import {z} from 'zod';


export const ReceiptItemSchema = z.object({
    shortDescription: z.string().min(1,"Description cannot be empty").transform(text => text.trim()),
    price: z.string().regex(/^\d+\.\d{2}$/,"Price must be in format Number 00.00")
});


export const ReceiptSchema = z.object({
    retailer: z.string(),
    purchaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    purchaseTime: z.string().regex(/^\d{2}:\d{2}$/),
    items:z.array(ReceiptItemSchema).min(1, "Receipt must have at least one item"),
    total:z.string().regex(/^\d+\.\d{2}$/)
});

export type Receipt = z.infer<typeof ReceiptSchema>;
export type ReceiptItem = z.infer<typeof ReceiptItemSchema>;


//validation receipt function create 

export function validateReceipt(data: unknown): Receipt{
    try{
        return ReceiptSchema.parse(data);
    } catch(error) {
        if (error instanceof z.ZodError) {
            //join errors together 
            const Errors = error.errors.map(err=> `${err.path.join('.')}: ${err.message}`);
            throw new Error(`Invalid Receipt: ${Errors.join(',')}`);
        }
        throw error;
    }
}