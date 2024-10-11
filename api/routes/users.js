import express from "express";


import dotenv from "dotenv"
dotenv.config()

import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { FilterUser, deleteUser, getClientMe, getClientRoomDetails, getUser, getUserMe, getUsers, searchUser, updateProfile, updateUser, updateUserPass } from "../controllers/userController.js";
import { addRoomToUser, removeRoomFromUser } from "../controllers/roomUserController.js";
const router = express.Router();
router.get("/checkauthentication",verifyToken,(req,res,next)=>{
     res.send("Hello user , you are logged in")
})

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//      res.send("Hello user , you are logged in and you can delete your account")
// })

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
     res.send("Hello admin , you are logged in and you can delete all account")
})




//Update --admin
router.put("/:id", verifyToken,verifyAdmin,updateUser)

//Delete --admin
router.delete("/:id",verifyToken,verifyAdmin,deleteUser)


//GetMe  --user
router.get("/profile/me",verifyToken,getUserMe)

//GetMe  --client
router.get("/profile/client",verifyToken,getClientMe)


//GetRoomDetails  --client
router.post("/profile/roomDetails",verifyToken,getClientRoomDetails);

//Update Password --user
router.put("/password/update",verifyToken,updateUserPass)

//Update me --user
router.put("/me/update",verifyToken,updateProfile)


//Get single user --admin
router.get("/:id",verifyToken,verifyAdmin,getUser)

//Get all users --admin
router.get("/",verifyToken,verifyAdmin,getUsers)


//Add room -- admin
router.put("/:id/addRoom/:roomId",verifyToken,verifyAdmin,addRoomToUser);


//Remove room -- admin
router.put("/:id/removeRoom/:roomId",verifyToken,verifyAdmin,removeRoomFromUser);



//Search User 
router.get("/new/search",verifyToken,verifyAdmin,searchUser)


//Filter User 
router.get("/new/filter",verifyToken,verifyAdmin,FilterUser)


export default router