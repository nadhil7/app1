import user from '../models/user.js'
const hello =(req,res)=>{
    res.render("index",{title:"user login"})
}
export {hello,}