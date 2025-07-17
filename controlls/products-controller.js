import express from 'express';
import product from "../models/products.js";

export const products = async (req, res) => {
    const productdata = await product.find();
    res.render('productPage', { title: "product-page", products: productdata })
}
export const productadd = (req, res) => {
    res.render('addproduct', { title: "product adding-page" })
}
export const addingproduct = async (req, res) => {
    console.log(req.body);
    
    try {
        const { name, brand, discription, price } = req.body;
        const newproduct = new product({
            name,
            brand,
            discription,
            price
        })
        await newproduct.save();
        req.session.message = {
            type: "success",
            message: "product were added"
        }
        res.redirect("/product/products")
    }
    catch (err) {
        console.log(err);
    }
}
export const editpage = async (req, res) => {
    console.log(req.params.id)
    try {
        const productid =await product.findById(req.params.id);
        res.render("editproduct", { title: "edit product Page",products:productid})

    }
    catch(err)
    {
        console.log(err);
        res.send(err)
    }
}
export const editproduct = async (req, res) => {
    const proid = req.params.id
    try {
        await product.findByIdAndUpdate(proid,{
            name: req.body.name,
            brand: req.body.brand,
            discription: req.body.discription,
            price: req.body.price
        });
        
        req.session.message = {
            type: "success",
            message: "product details edited"
        }
        res.redirect("/product/products")
    }
    catch (err) {
        console.log(err);

    }
}
export const deleteproduct= async(req,res)=>{
    try{
        const proid = req.params.id
        await product.findByIdAndDelete(proid)
        res.status(200).json({
            success:true
        });
        res.redirect("/product/products")
    }
    catch(err)
    {
        console.log(err);
        res.send(err)
        
    }
}