import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
         type:String,
        required:true,
        uniqe:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        }
},{ timestamps: true })

const User =mongoose.model("User", userSchema )

export default User;