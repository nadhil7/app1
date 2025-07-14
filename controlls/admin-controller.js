import express from 'express';
import user from "../models/user.js";

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const users = await user.findOne({ email });
        console.log(users)
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
           const user=new User({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            image:req.file.filename
        });

    }
    catch(err){
        res.status(404).send("there is a problem while adding the user!")
    }
}
const admin =async (req,res)=>{
    try{
        const users = await User.find();
        res.render("homepage", {
            title: "Admin dashbord",
            users: users,})
    }
    catch(err){
        res.send(err)
    }
}

export { login ,useradd,admin,added}