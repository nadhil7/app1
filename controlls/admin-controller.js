import express from 'express';
import bcrypt from 'bcrypt';
import user from "../models/user.js";
const login = (req, res) => {
    res.render("loginpage", { title: "loginpage" })
}

const admincheck = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userdata = await user.findOne({ email });
        if (!userdata) {
            res.status(404).send("no email matching")
        }
        if (!userdata.role) {
            res.status(404).send("authentication rejected :- login for admin only")
        }
        const match = await bcrypt.compare(password, userdata.password)
        if(!match)
        {
            res.status(404).send("authentication rejected :- password didn't match")

        }
        req.session.user=userdata;
        res.redirect("/addhome")
    } catch(err){
        res.send(err);
    }

}
const admin = async (req, res) => {
    try {
        const users = await user.find();
        res.render("admindashboard", {
            title: "Admin dashbord",
            users: users,
        })
    }
    catch (err) {
        res.send(err)
    }
}
const useradd = (req, res) => {
    res.render('adduser', { title: "addUser-page" })
}
const added = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        const salt = 10;
        const hashedpass = await bcrypt.hash(password, salt)
        const userdata = new user({
            name,
            password: hashedpass,
            email,
            phone
        })
        await userdata.save();
        req.session.message = {
            type: "success",
            message: "User added successfully"
        }
        res.redirect("/addhome")
    }
    catch (err) {
        res.status(404).send(err)
    }
}
const deleteuser = async (req, res) => {
    const userid = req.params.id
    try {
        await user.findByIdAndDelete(userid);
        res.status(200).json({
            success: true
        });
    }
    catch (err) {
        res.send(err);
    }
}
const editpage = async (req, res) => {
    try {
        const userdata = await user.findById(req.params.id)
        res.render("edituser", { title: "edit user page", users: userdata })
    }
    catch (err) {
        res.status(500).send("user not found")
    }
}
const edituser = async (req, res) => {
    const userid = req.params.id
    try {
        await user.findByIdAndUpdate(userid, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })
        res.redirect("/addhome")
    }
    catch (err) {
        res.send(alert("User not Deleted"))
        console.log(err);
    }
}
const logout = (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({success:false})
        }
        else{
            res.json({success:true})
            
        }
    })

}
export { admincheck, useradd, admin, added, login, deleteuser, edituser, editpage,logout }