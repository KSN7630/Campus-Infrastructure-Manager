import User  from  "../models/User.js"
import bcrypt from "bcryptjs"
import { createError} from "../utils/error.js";
import { sendToken } from "../utils/verifyToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"

//new code
export const register = async (req,res,next)=>{ 
    try{
       const userId=req.body.userName;
       const existingUser = await User.findOne({ userId });
       if (existingUser) {
         next(createError(500,"Username In Use"));
       }
       const newUser = new User(req.body);
       await newUser.save()
       res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }
}

export const login = async (req,res , next)=>{
    const {userName,password} =req.body;
    if(!userName || !password){
        return next(createError(400,"Please Enter Username & Password !"))
    }
    try{
        const user =await User.findOne({userName: userName}).select("+password");
        if(!user) return next(createError(401,"Invalid Credentials: Please Provide Valid Credentials"))
        const isPasswordCorrect =bcrypt.compareSync(password, user.password); // true
        if(!isPasswordCorrect) return next(createError(401,"Invalid Credentials: Please Provide Valid Credentials"))
        sendToken(user,200,res);
    }catch(err){
        next(err)
    }
}


//Logout user
export const logout = async (req,res , next)=>{
    res.cookie("access_token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
}



//Forgot password
export const forgotPassword = async(req,res,next)=>{
    const username=req.query.username;
    const user = await User.findOne({userName:username});
    console.log("UserName from backend");
    console.log(req.body.userName);
    if (!user) {
        return next(createError(404, "User not found."));
    }

    //Get Reset Password Token
    const resetToken=user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    

    try {
        await sendEmail({
        email: user.email,
        subject: `IITJ-Room Password Recovery`,
        message,
        });

        res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(createError(500,error.message));
    }
}



//Reset Password
export const resetPassword = async(req,res,next)=>{

    //crating token hash
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken:resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if (!user) {
        return next(createError(400, "Reset Password Token is invalid or has been expired ."));
    }

    if(req.body.password !=req.body.confirmPassword){
        return next(createError(400, "Password does not match."));
    }

    user.password=req.body.password ;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    sendToken(user,200,res);
}




export const updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
  
    try {
      const user = await User.findById(req.user.id).select("+password");
      
      if (!user) {
        return next(createError(404, 'User not found.'));
      }
  
      // Validate current password
      const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
      
      if (!isPasswordValid) {
        return next(createError(400, 'Current password is incorrect.'));
      }
  
      // Validate new password and confirm password
      if (newPassword !== confirmPassword) {
        return next(createError(400, 'New password and confirm password do not match.'));
      }
  
      // Update the password
      user.password = confirmPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      next(error);
    }
  };
  





