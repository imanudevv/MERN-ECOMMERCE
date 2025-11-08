
import express from 'express';
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, updateProducts } from '../controller/productControl.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

//routes
router.route("/products")
  .get(verifyUserAuth, getAllProducts)
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

router.route("/product/:id")
  .put(verifyUserAuth, updateProducts)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct)
  .get(verifyUserAuth, getSingleProduct);

export default router;
