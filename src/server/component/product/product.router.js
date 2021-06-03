import express from 'express';
import authController from '../auth/auth.controller.js';
import productMiddleware from './product.middleware.js'
import { validate } from 'express-validation'
import productController from './product.controller.js'
import { checkReqProduct, checkReqProductName } from './product.validation.js'
const router = express.Router();

import {upload} from '../../const/saveImage.js'
router.post('/addProduct',validate(checkReqProduct), authController.checkLogin, authController.isStaffOrManager,productMiddleware.checkExistProductName, productMiddleware.checkExistCategoryName, productController.createProduct)
router.get('/allProduct', authController.checkLogin, authController.isStaffOrManager, productController.getListProductByCategoryId)
router.delete('/deleteProduct',validate(checkReqProductName), authController.checkLogin, authController.isStaffOrManager, productController.deleteProductByName)

router.put("/image",upload.array('product', 10), productController.uploadImage);
router.get('/search', productController.searchProduct);
export default router;
