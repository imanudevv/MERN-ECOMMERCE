import mongoose from "mongoose";
const productScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plese Enter The Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Plese Enter Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Plese Enter Product Price"],
        maxLength:  [7, "Price canot exceed 7 digits"]
    },
    ratings: {
         type: Number,
         default:0
    },
    image: [
        {
         public_id:{
            type:String,
            required:true
         },
         url: {
             type:String,
            required:true
         }
        }
    ],
    category : {
          type: String,
        required: [true, "Plese Enter Product Category"],
    },
    stock: {
          type: Number,
        required: [true, "Plese Enter Product Stock"],
        maxLength:  [5, "Price canot exceed 5 digits"],
        default:1
    },
    numberOfReview:{
        type:Number,
        default:0
    },
    reviews: [
        { 
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true

        },
            name:{
                type:String,
                required:true
            },
            rating : {
                 type:String,
                required:true
            },
            comment:{
                 type:String,
                required:true
            }
        }
    ],

    user:{
         type:mongoose.Schema.ObjectId,
         ref:"User",
         require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Product",productScema)