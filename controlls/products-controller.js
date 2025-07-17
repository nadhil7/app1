import express from 'express';
import user from "../models/user.js";

export const product =(req,res)=>{
    res.render('/addhome',{title:"product-page"})
} 

