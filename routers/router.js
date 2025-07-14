import express from 'express';
const router = express.Router();
import {hello,} from '../controlls/controller.js'
import {login,useradd,admin,added} from '../controlls/admin-controller.js'
router.get("/",hello);
router.post("/login",login)
router.get("/adduser",useradd)
router.post("/add",added)
router.get("/addhome",admin)
export default router