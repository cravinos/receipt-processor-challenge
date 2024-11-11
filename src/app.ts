import express from 'express'
import { validateReceipt } from './types/receipt';
import routes from './routes/routes';

const app = express();
app.use(express.json());

app.use('/receipts',routes);

//testing endpoint created -- old initial endpoint when setting up ENV - going to remove for final release
// app.post ('/test/validate', (req,res)=> {
//     try{
//         const validatedReceipt = validateReceipt(req.body);
//         res.json({
//             status: 'valid',
//             receipt: validatedReceipt
//         });
//     } catch (error){
//         res.status(400).json({
//             status: "Invalid",
//             error: error instanceof Error ? error.message: 'unidentified error'
//         })
//     }
// })

app.use((err:Error, req: express.Request, res: express.Response, next: express.NextFunction)=> {

    
    res.status(500).json({error: "Error - See below:" + err.stack })
})

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT);
//nice error handling and not using typescript type any 
server.on('error', (err: Error) => {
    /**
     * comment out  next two lines WHEN running test for CLEANER consolse OUTPUT 
     * or atleast comment process.exit(1) to get full test coverage to run without timeouts failing final tests
     * 
     */
    console.error(`Error starting server on port ${PORT}:`, err);
    // process.exit(1);
});

server.on('listening', () => {
    console.log(`Server is running on port ${PORT} - Status is: OK`);
});

export default app;