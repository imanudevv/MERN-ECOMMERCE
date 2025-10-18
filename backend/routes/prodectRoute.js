import express from 'express';
import { getAllProducts } from '../controller/productControl.js';
const router = express.Router();

//routes
router.route("/products").get(getAllProducts)

export default router;