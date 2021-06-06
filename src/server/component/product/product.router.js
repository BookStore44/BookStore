import express from 'express';
import authController from '../auth/auth.controller.js';
import productMiddleware from './product.middleware.js'
import { validate } from 'express-validation'
import productController from './product.controller.js'
import { checkReqProduct, checkReqProductId } from './product.validation.js'
const router = express.Router();

import { upload } from '../../const/saveImage.js'
router.post('/',
    validate(checkReqProduct),
    authController.isStaffOrManager,
    productMiddleware.checkExistProduct,
    productMiddleware.checkExistCategory,
    productController.createProduct);

router.delete('/:id',
    productMiddleware.validateId,
    authController.isStaffOrManager,
    productController.deleteProduct)

router.get('/:id',
    productMiddleware.validateId,
    authController.isStaffOrManager,
    productController.deleteProduct);

router.put('/:id',
    productMiddleware.validateId,
    authController.isStaffOrManager,
    productController.updateProduct);


router.get('/allProduct/:category/:page',
    authController.isStaffOrManager,
    productController.getListProductByCategoryId)

router.put("/image",
    upload.array('product', 10),
    productController.uploadImage);

router.get('/search',
    productController.searchProduct);
    
export default router;
