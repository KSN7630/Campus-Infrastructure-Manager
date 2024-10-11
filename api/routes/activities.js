import express from "express";
import {createActivityForMe,createActivity, deleteActivity, getActivity} from "../controllers/activitiesController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";



const router = express.Router();

router.post("/:userId",verifyToken,createActivity);
router.post("/new/me",verifyToken,createActivityForMe);
router.delete("/:id",verifyToken,verifyAdmin,deleteActivity)
router.get("/:id",verifyToken,verifyAdmin,getActivity);
export default router