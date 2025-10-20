import express from 'express';
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, updateProducts } from '../controller/productControl.js';
const router = express.Router();

//routes
router.route("/products")
.get(getAllProducts)
.post(createProducts);
router.route("/product/:id")
.put(updateProducts)
.delete(deleteProduct).get(getSingleProduct)

export default router;