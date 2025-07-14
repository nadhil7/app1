import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import router from './routers/router.js';
const uri ='mongodb://127.0.0.1:27017/app1'
mongoose.connect(uri).then(()=>{
    console.log("database connected");
})
const app=express()
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(session({
    secret:'haha',
    resave:false,
    saveUninitialized:'false'
}))
app.listen(5000,()=>{
    console.log("server started at  http://localhost:5000");
})
app.set('view engine','ejs');
app.use(router);