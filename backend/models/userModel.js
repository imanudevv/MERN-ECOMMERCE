import mongoose from "mongoose";
import validator from 'validator';

const userScema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter your name"],
        maxLength:[25,"Invalid name. Plese enter a name with fewer than 25 characters"],
        minLength:[3,"Name Should contain more then 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your password"],
        unique:true,
        minLength:[validator.isEmail,"Please enter valid"]
    }
})