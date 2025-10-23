import Product from '../models/productModel.js';
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import { Query } from 'mongoose';

// http://localhost:8000/api/v1/product/68f4ff1a50af7d4eb67a19d6?keyword=shirt

// 1️⃣ Creating products
export const createProducts =handleAsyncError (async (req, res,next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
});

// 2️⃣ GET ALL PRODUCTS
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const apiFunctionality = new APIFunctionality(Product.find(), req.query).search().filter();
  const products = await apiFunctionality.query

  res.status(200).json({
    success: true,
    products,
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
