import express from 'express'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/health', (req,res)=> {
    res.json({status:'OK'});
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

export default app;