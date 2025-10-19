import express from 'express';
import { createProducts, getAllProducts } from '../controller/productControl.js';
const router = express.Router();

//routes
router.route("/products").get(getAllProducts).post(createProducts)

export default router;