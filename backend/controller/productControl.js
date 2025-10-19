import product from '../models/prodectModel.js'




//1️⃣creating products
  export const createProducts = async(req,res)=>{
    console.log(req.body);
    
    // await product.create(req.body)
 }





export const getAllProducts = (req, res) => {
    res.status(200).json({
        messege: "All Products"
    })
}