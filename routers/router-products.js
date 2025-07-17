import express from 'express';
const router = express.Router();
import {product} from '../controlls/products-controller.js';
router.get('/products',product)




export default router