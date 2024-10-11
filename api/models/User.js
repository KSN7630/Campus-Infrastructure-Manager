import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"

const UserSchema= new mongoose.Schema({
    isAdmin : {
        type : Boolean,
        default : false,
    },
    // image:{
    //     public_id:{
    //         type:String,
    //         // required:true
    //     },
    //     url:{
    //         type:String,
    //         // required:true
    //     }
    // },
    personType: {
        type: String,
        enum: ['Student', 'Faculty', 'Staff', 'Other'],
        default: 'Other',
        required: [true,"Please Enter Person Category"],
    },
    userName : {
        type : String,
        required: [true,"Please Enter Username"],
        unique : true,
        trim:true
    },
    fullName : {
        type : String,
        required: [true,"Please Enter Your Full Name"],
        maxLength:[50,"Name Can not Exceed 50 characters"],
        minLength:[4,"Name should have more than 4 characters"],
        trim:true
    },
    email : {
        type : String,
        required: [true,"Please Enter Your Email"],
        unique : true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password : {
        type : String,
        required: true,
        minLength:[6,"Password should have more than 6 characters"],
        select:false
    },
    personDesc : {
        type : String,
    },
    joiningDate: {
        type: Date,
        required: [true,"Please Enter Joining Date Tentative"],
    },
    leavingDate: {
        type: Date,
        default: null
    },
    allotedRooms: {
        type: [String],
        default: []
    },
    prevAllotedRooms: {
        type: [String],
        default: []
    },
    activityList: {
        type: [String],
        default: []
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps : true});


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})





//Generating Password Reset Token

UserSchema.methods.getResetPasswordToken= function(){
    //Generating token
    const resetToken= crypto.randomBytes(20).toString("hex");
    
    
    //Hashing and add to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15 * 60 *1000;

    return resetToken;
}


export default mongoose.model("User" , UserSchema)


  