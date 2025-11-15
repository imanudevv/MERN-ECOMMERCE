
import express from 'express';
import { createProducts, createReviewForProduct, deleteProduct, getAdminProducts, getAllProducts, getSingleProduct, updateProducts } from '../controller/productControl.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

//routes
router.route("/products")
  .get(getAllProducts);

  router.route("/admin/products")
  .get(verifyUserAuth,roleBasedAccess("admin"),getAdminProducts);
router.route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

router.route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProducts)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct)
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verifyUserAuth,createReviewForProduct)

export default router;
