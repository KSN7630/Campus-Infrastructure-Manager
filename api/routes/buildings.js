import express from "express";

import Building from "../models/Building.js";
import { createBuilding, deleteBuilding, getAllBuilding, getBuilding, getRoomInBuilding, updateBuilding } from "../controllers/buildingController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router =express();

//create
router.post("/",verifyToken,verifyAdmin,createBuilding);

//update
router.put("/:id",verifyToken,verifyAdmin,updateBuilding)

//delete
router.delete("/:id",verifyToken,verifyAdmin,deleteBuilding)

//get
router.get("/:id",verifyToken,verifyAdmin,getBuilding)

//get all
router.get("/",verifyToken,verifyAdmin,getAllBuilding)

//get Room from Building id
router.get("/:buildingId/roomInfo",verifyToken,verifyAdmin,getRoomInBuilding)



export default router;