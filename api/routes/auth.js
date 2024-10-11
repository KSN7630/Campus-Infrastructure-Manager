import express from "express";
import {forgotPassword, login,logout,register, resetPassword, updatePassword } from "../controllers/authController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";



const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/password/forgot",forgotPassword);
router.put("/password/reset/:token",verifyToken,resetPassword);
router.post("/update/password",verifyToken,updatePassword);

export default router