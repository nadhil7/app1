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
            req.session.message = {
                type: "danger",
                message: "No user found"
            }
            return res.redirect("/admin/login")
        }
        const match = await bcrypt.compare(password, userdata.password)
        if (!match) {
            req.session.message = {
                type: "danger",
                message: "Password didn't Match!"
            }
            return res.redirect("/admin/login")
        }
        if (userdata.role == true) {
            req.session.user = userdata;
            return res.redirect("/admin/addhome")
        }
        if (userdata.role == false) {
            req.session.user = userdata;
            return res.redirect("/user/userhome")
        }
        return res.redirect("/admin/login")
    } catch (err) {
        console.log(err);
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
        res.redirect("/admin/addhome")
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
        req.session.message = {
            type: "danger",
            message: "user deleted !"
        }
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
            phone: req.body.phone
        })
        req.session.message = {
            type: "success",
            message: "user details updated"
        }
        res.redirect("/admin/addhome")
    }
    catch (err) {
        res.send(alert(err))
        console.log(err);
    }
}
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false })
        }
        else {
            res.json({ success: true })

        }
    })

}
export const active=async (req,res)=>{
    const userid = req.params.id
    try{
        await user.findByIdAndUpdate(userid,{
            status:req.body.status
        })
        return res.json({
            success:true
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            success:false
        })
        
    }
}
export { admincheck, useradd, admin, added, login, deleteuser, edituser, editpage, logout }