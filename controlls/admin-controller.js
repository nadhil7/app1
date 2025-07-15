import express from 'express';
import user from "../models/user.js";
const login = (req, res) => {
    res.render("loginpage", { title: "loginpage" })
}

const admincheck = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await user.findOne({ email });
        if (email == users.email && password == users.password) {
            if (users.role == true) {
                res.redirect("/addhome");
            }
            else {
                res.json({ message: err.message });

            }
        } else {
            res.status(404).send('admin not found')
        }
    } catch (err) {
        res.status(500).json(err);
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
        const userdetails = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        });
        await userdetails.save();
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
export { admincheck, useradd, admin, added, login,edituser }