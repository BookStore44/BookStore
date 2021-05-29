import express from 'express';
import authController from '../auth/auth.controller.js';
import categoryMiddleware from './category.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import categoryController from './category.controller.js'
import {checkReqCatename} from './category.validate.js'
const router = express.Router();
router.post('/addCategory',validate(checkReqCatename), authController.checkLogin, authController.isStaffOrManager,categoryMiddleware.checkExistCategoryName, categoryController.createCategory)
router.get('/allCategory', authController.checkLogin, authController.isStaffOrManager, categoryController.getListCategory)
router.delete('/deleteCategory', authController.checkLogin, authController.isStaffOrManager, categoryController.deleteCategoryById)
router.put('/updateCategoryNameById', authController.checkLogin, authController.isStaffOrManager, categoryController.updateCategoryNameById)
export default router;
