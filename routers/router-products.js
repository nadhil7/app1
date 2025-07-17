import express from 'express';
const router = express.Router();
import {products,productadd,addingproduct,editpage,editproduct,deleteproduct} from '../controlls/products-controller.js';
router.get('/products',products)
router.get('/addproduct',productadd)
router.post('/productadd',addingproduct)
router.get('/editpage/:id',editpage)
router.post('/productedit/:id',editproduct)
router.delete('/delete/:id',deleteproduct)







export default router