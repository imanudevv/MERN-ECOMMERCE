import Product from '../models/productModel.js';
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import { Query } from 'mongoose';

// http://localhost:8000/api/v1/product/68f4ff1a50af7d4eb67a19d6?keyword=shirt

// 1️⃣ Creating products
export const createProducts =handleAsyncError (async (req, res,next) => {
  req.body.user=req.user.id;

  
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
});

// 2️⃣ GET ALL PRODUCTS
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 3;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  // getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();


// Calculate totalPages based on filtered count
const totalPages = Math.ceil(productCount / resultPerPage);
const page = Number(req.query.page) || 1;

if (page > totalPages && productCount > 0) {
  return next(new HandleError("This page doesn't exist", 404));
}


//Apply pagination
apiFeatures.pagination(resultPerPage)
const products = await apiFeatures.query;

if (!products || products.length===0){
  return next (new HandleError("No Product Found",404))
}

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage:page
  });
});




//3️⃣ UPDATE PRODUCTS
export const updateProducts = handleAsyncError(async (req,res,next) => {

 const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
  new:true,
  runValidators:true
 })
  if (!product) {
    return next(new HandleError("Product Not Found",404))
  }
  res.status(200).json({
    success:true,
    product
  })
})

// 4️⃣4️ DELETE PRODUCT

export const deleteProduct = handleAsyncError(async(req,res,next)=>{
  
const product=await Product.findByIdAndDelete(req.params.id);
 if (!product) {
    return next(new HandleError("Product Not Found",404))
  }

 res.status(200).json({
    success:true,
    messege:"Product Deleted Successfully"
  })
})


// 5️⃣ ACCESSING SINGLE PRODUCT

export const getSingleProduct = handleAsyncError(async (req, res,next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found",404))
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Admin-Getting all products
export const getAdminProducts =handleAsyncError(async(req, res , next)=>{
  const products = await Product.find();
  req.status(200).json({
    success:true,
    products
  })

})