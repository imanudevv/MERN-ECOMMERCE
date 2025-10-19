import express from 'express';
import { createProducts, getAllProducts, updateProducts } from '../controller/productControl.js';
const router = express.Router();

//routes
router.route("/products").get(getAllProducts).post(createProducts);
router.route("/product/:id").put(updateProducts);

export default router;