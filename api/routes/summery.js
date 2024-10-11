import express from "express";

import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { summeryHome } from "../controllers/summeryController.js";

const router =express();


//get summery for Home page
router.get("/summeryhome",verifyToken,verifyAdmin,summeryHome)



export default router;