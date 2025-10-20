import Product from '../models/productModel.js';

// 1️⃣ Creating products
export const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
};

//2️⃣ GET ALL PRODUCTS
export const getAllProducts=  async (req, res) => {
  const products= await Product.find()
  res.status(200).json({
    success:true,
    products
    
  });
};

//3️⃣ UPDATE PRODUCTS
export const updateProducts = async (req,res) => {
 let  product = await Product.findById(req.params.id);
if(!product){
  return res.status(500).json({
    success:false,
    messege:"product not found"
  })
}
 product=await Product.findByIdAndUpdate(req.params.id,req.body,{
  new:true,
  runValidators:true
 })
  res.status(200).json({
    success:true,
    product
  })
}

// 4️⃣4️ DELETE PRODUCT

export const deleteProduct = async(req,res)=>{
   let  product = await Product.findById(req.params.id);
   if(!product){
  return res.status(500).json({
    success:false,
    messege:"product not found"
  })
}
product=await Product.findByIdAndDelete(req.params.id);
 res.status(200).json({
    success:true,
    messege:"Product Deleted Successfully"
  })
}


// 5️⃣ ACCESSING SINGLE PRODUCT

export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};
