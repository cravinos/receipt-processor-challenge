import { ValidationException } from '@aws-sdk/client-bedrock-runtime';
import express from 'express'
import { validateReceipt } from './types/receipt';

const app = express();
app.use(express.json());


//testing endpoint created 

app.post ('/test/validate', (req,res)=> {
    try{
        const validatedReceipt = validateReceipt(req.body);
        res.json({
            status: 'valid',
            receipt: validatedReceipt
        });
    } catch (error){
        res.status(400).json({
            status: "Invalid",
            error: error instanceof Error ? error.message: 'unidentified error'
        })
    }
})

const PORT = process.env.PORT || 8000;

app.get('/health', (req,res)=> {
    res.json({status:'OK'});
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

export default app;