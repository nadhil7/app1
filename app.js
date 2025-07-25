import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import router from './routers/router.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/router-products.js';
const uri ='mongodb://127.0.0.1:27017/app1'
mongoose.connect(uri).then(()=>{
    console.log("database connected");
})
const app=express()
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json())
app.use(session({
    secret:'haha',
    resave:false,
    saveUninitialized:'false'
}))
app.use((req,res,next)=>{
    res.locals.message=req.session.message
    delete req.session.message
    next()
})
app.listen(5000,()=>{
    console.log("server started at  http://localhost:5000/login");
})
app.set('view engine','ejs');
app.use("/admin",router);
app.use("/product",productRouter);
app.use("/user",userRouter);
app.use("/",(req,res)=>{
    res.redirect("/admin/login");
})

