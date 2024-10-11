import express from "express";
import { createRoom, deleteRoom, filterRooms, getRoom, getRooms, getRoomsCount, roomuserdataEnd, updateRoom } from "../controllers/roomController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { addUserToRoom, removeUserFromRoom } from "../controllers/roomUserController.js";
const router = express.Router();

//Create
router.post("/:buildingId", verifyToken,verifyAdmin,createRoom)

//Update
router.put("/:id",verifyToken,verifyAdmin, updateRoom)

//Delete
router.delete("/:id/:buildingId",verifyToken,verifyAdmin,deleteRoom)

//Get
router.get("/:id",verifyToken,getRoom)

//Get Count
router.get("/cnt/tot/room",verifyToken,getRoomsCount)


//Get all
router.get("/",verifyToken,verifyAdmin, getRooms)


//Add user to room
router.put("/:id/add/:userId",verifyToken,verifyAdmin,addUserToRoom);

//Remove user from room
router.put("/:id/remove/:userId",verifyToken,verifyAdmin,removeUserFromRoom);


//Remove user from room
router.get("/new/search",filterRooms);

//
router.post("/endpoint/dataexel/:buildingId",roomuserdataEnd);


export default router