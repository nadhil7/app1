import mongoose from 'mongoose';
const schema = mongoose.Schema;
const productmodel = new schema({
    name:{
        type:"string",
        required:"true"
    },
    brand:{
        type:"string",
        required:"true"
    },
    discription:{
        type:"string",
        required:"true"
    },
    price:{
        type:"string",
        required:"true"
    }
})
const product = mongoose.model("product",productmodel,"products")
export default product