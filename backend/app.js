import express from 'express';
import product from './routes/prodectRoute.js';
import user from './routes/userRoutes.js';
import errorHandleMiddleware from './middleware/error.js'
const app=express();

//Midillware
app.use(express.json())

//Route
app.use("/api/v1",product)
app.use("/api/v1",user)

app.use(errorHandleMiddleware)
export default app; 