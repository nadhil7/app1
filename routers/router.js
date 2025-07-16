import express from 'express';
const router = express.Router();
import {login,useradd,admin,added,admincheck,deleteuser,edituser,editpage} from '../controlls/admin-controller.js'
router.get("/login",login)
router.post("/adminpage",admincheck)
router.use("/",(req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        res.send("Entry Restricted!");
    }
})
router.get("/addhome",admin)
router.get("/adduser",useradd)
router.delete("/delete/:id",deleteuser)
router.post("/add",added)
router.get("/editpage/:id",editpage)
router.post("/edituser/:id",edituser)
export default router