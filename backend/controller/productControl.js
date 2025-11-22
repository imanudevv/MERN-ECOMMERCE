import Product from '../models/productModel.js';
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';

// 1️⃣ Creating products
export const createProducts = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// 2️⃣ GET ALL PRODUCTS
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 3;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  const totalPages = Math.ceil(productCount / resultPerPage);
  const page = Number(req.query.page) || 1;

  if (productCount > 0 && page > totalPages) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  apiFeatures.pagination(resultPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage: page
  });
});

// 3️⃣ UPDATE PRODUCTS
export const updateProducts = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  res.status(200).json({ success: true, product });
});

// 4️⃣ DELETE PRODUCT
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  res.status(200).json({ success: true, message: "Product Deleted Successfully" });
});

// 5️⃣ GET SINGLE PRODUCT
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  res.status(200).json({ success: true, product });
});

// 6️⃣ CREATING AND UPDATING REVIEW
export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  const reviewExist = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (reviewExist) {
    product.reviews.forEach(r => {
      if (r.user.toString() === req.user._id.toString()) {
        r.rating = Number(rating);   // ✅ FIXED BUG
        r.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;

  let sum = 0;
  product.reviews.forEach(r => {
    sum += Number(r.rating);
  });

  product.ratings =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
    numOfReviews: product.numOfReviews,
    ratings: product.ratings
  });
});

//7️⃣ GETTING REVIEWS
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
});

//8️⃣ DELETING REVIEWS
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    review => review._id.toString() !== req.query.id.toString()
  );

  let sum = 0;
  reviews.forEach(review => {
    sum += review.rating;
  });

  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully"
  });
});

// 9️⃣ Admin - Get all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});
