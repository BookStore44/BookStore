import express from 'express';
import *as authModel from '../../middleware/auth.js';
import *as ProductMiddleware from './product.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import *as ProductController from './product.controller.js'
const router = express.Router();
router.post('/addProduct',validate(ProductMiddleware.checkReqProduct), authModel.checkLogin, authModel.isStaffOrManager,ProductMiddleware.isExistproductname, ProductController.createProduct)
router.get('/allProduct', authModel.checkLogin, authModel.isStaffOrManager, ProductController.allProductByIdCategory)
router.delete('/deleteProduct',validate(ProductMiddleware.checkReqProductName), authModel.checkLogin, authModel.isStaffOrManager, ProductController.deleteByProductName)
router.put('/avatar', authModel.checkLogin ,upload.single('avatar'), userController.updateAvatar);
export default router;
