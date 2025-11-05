import mongoose from "mongoose";
import validator from 'validator';
import bycryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [25, "Invalid name. Plese enter a name with fewer than 25 characters"],
        minLength: [3, "Name Should contain more then 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your password"],
        minLength: [8, "password should be greater than 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps:true})

//Password Hashing
userScema.pre("save",async function(){
    this.password=await bycryptjs.hash(this.password,10)
    //1st -updating profile(name , email, image)--hashed again❌
    //2nd - Update password ✅
    if (!this.isModified("password")){
        return next();
    }
})

userScema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.
        JWT_SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRE
        }
    )
}

export default mongoose.model("User",userScema)
