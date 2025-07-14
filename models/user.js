import mongoose from 'mongoose';
const schema = mongoose.Schema;
const usermodel = new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    role:{
        type:Boolean,
        default:false
    }
})      
const user = mongoose.model("user",usermodel,'user');
export default user
