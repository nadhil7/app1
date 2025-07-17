import express from 'express';
import bcrypt from 'bcrypt';
import user from "../models/user.js";
export const userhome = (req,res)=>{
    res.render("userpage",{title:"userHome-Page"})
}