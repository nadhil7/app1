import express from 'express';
const router = express.Router();
import {login,useradd,admin,added,admincheck,edituser} from '../controlls/admin-controller.js'
router.get("/login",login)
router.post("/adminpage",admincheck)
router.get("/addhome",admin)
router.get("/adduser",useradd)
router.get("/edituser",edituser)
router.post("/add",added)
export default router