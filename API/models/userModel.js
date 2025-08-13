import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
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
    refreshToken:{
         type:String,
        required:true,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false,
        }
},{ timestamps: true })

const User =mongoose.model("User", userSchema )

export default User;