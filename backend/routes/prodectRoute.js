import express from 'express';
import { 
  createProducts, 
  createReviewForProduct, 
  deleteProduct, 
  deleteReview, 
  getAdminProducts, 
  getAllProducts, 
  getProductReviews, 
  getSingleProduct, 
  updateProducts 
} from '../controller/productControl.js';

import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

// User - Get all products
router.route("/products")
  .get(getAllProducts);

// Admin - Get all products
router.route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

// Admin - Create product
router.route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

// Admin - Update / Delete product
router.route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProducts)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

// Get single product details
router.route("/product/:id")
  .get(getSingleProduct);

// Create or update review
router.route("/review")
  .put(verifyUserAuth, createReviewForProduct);

// Get or delete reviews
router.route("/reviews")
  .get(getProductReviews)
  .delete(verifyUserAuth, deleteReview);

export default router;
