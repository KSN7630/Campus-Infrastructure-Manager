import jwt from "jsonwebtoken";
import createError from "./error.js"
import User from "../models/User.js";


//create and send token
export const sendToken=(user,statusCode,res)=>{
    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET ,{
        expiresIn:process.env.JWT_EXPIRE,
    });  
    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *  60 * 1000
        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie("access_token",token,options).json({
        user,access_token:token
    });
};


// use this for authentication of user
export const verifyToken =async (req, res, next) => {

    console.log("VerifyToken Called!");

    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated!"));

    const decodedData=jwt.verify(token, process.env.JWT_SECRET);

    req.user=await User.findById(decodedData.id);
    next();
}




export const verifyAdmin  = (req,res,next) => {
      console.log("Verify admin called")
      if (!(req.user.isAdmin)) {
        return next(createError(401 , "You are not allowed to access this resource !"));
      }
      next();
};



// export const verifyUser = (req, res, next) => {

//     verifyToken(req, res, () => {

//         console.log("VerifyUser Callback function called!")

//         if (req.user.id === req.params.id || req.user.isAdmin) {
//             console.log("User verified!");
//             next();
//         } else {
//             return next(createError(403, "You are not authorized!"));
//         }
//     });
// };

















  



































// import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(createError(401, "You are not authenticated!"));
//   }

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next();
//   });
// };

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };