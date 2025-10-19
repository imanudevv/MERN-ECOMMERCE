import express from 'express';
import product from './routes/prodectRoute.js';
const app=express();

//Midillware
app.use(express.json())

//Route
app.use("/api/v1",product)
export default app; 