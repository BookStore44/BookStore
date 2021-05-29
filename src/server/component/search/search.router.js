import express from 'express';
import { searchProduct } from './search.controller.js'
const router = express.Router();
router.get('/product', searchProduct);
export default router;