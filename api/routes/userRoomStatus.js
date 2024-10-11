import express from "express";
import { roomStatusUser } from "../controllers/roomUserController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:userId/:roomId",verifyToken,roomStatusUser);


export default router