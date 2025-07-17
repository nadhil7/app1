import express from "express";
const router = express.Router();
import {userhome} from'../controlls/userController.js'
router.get("/userhome",userhome);

export default router;