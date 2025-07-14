import express from 'express';
import user from "../models/user.js";

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const users = await user.findOne({ email });
        if (email==users.email && password==users.password) {
            if(users.role==true)
            {
             res.render('homepage',{title:"admin dashboard"})
            }
            else{
             res.send('admin not found')

            }
        }else{
             res.status(404).send('admin not found')
        }
    } catch (err) {
        res.status(500).json(send(err));
    }

}
const useradd = (req,res)=>{
    res.render('adduser',{title:"addUser-page"})
}
const added = async(req,res)=>{
    try{
        const addeduser = await req.body;
        console.log(addeduser);
        res.send("hi");
    }
    catch(err){
        res.status(404).send("there is a problem while adding the user!")
    }
}
const admin = (req,res)=>{
    res.redirect('homepage',{title:"admin dashboard"})
}

export { login ,useradd,admin,added}