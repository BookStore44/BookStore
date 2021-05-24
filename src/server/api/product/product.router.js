import express from 'express';
import authModel from '../../middleware/auth.js';
import ProductMiddleware from './product.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import ProductController from './product.controller.js'
import { checkReqProduct, checkReqProductName } from './product.validation.js'
const router = express.Router();
import multer from 'multer';
import {upload} from '../../const/saveImage.js'
router.post('/addProduct',validate(checkReqProduct), authModel.checkLogin, authModel.isStaffOrManager,ProductMiddleware.isExistproductname, ProductController.createProduct)
router.get('/allProduct', authModel.checkLogin, authModel.isStaffOrManager, ProductController.allProductByIdCategory)
router.delete('/deleteProduct',validate(checkReqProductName), authModel.checkLogin, authModel.isStaffOrManager, ProductController.deleteByProductName)
//router.put('/avatar', authModel.checkLogin ,upload.single('avatar'), userController.updateAvatar);
router.put("/image",upload.array('product', 10), ProductController.uploadImage);
export default router;
