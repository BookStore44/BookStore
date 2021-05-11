import express from 'express';
import *as authModel from '../../middleware/auth.js';
import *as CateMiddleware from './category.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import *as CateController from './category.controller.js'
import {checkReqCatename} from './category.validate.js'
const router = express.Router();
router.post('/addCategory',validate(checkReqCatename), authModel.checkLogin, authModel.isStaffOrManager,CateMiddleware.isExistcategoryname, CateController.createCategory)
router.get('/allCategory', authModel.checkLogin, authModel.isStaffOrManager, CateController.allCategory)
router.delete('/deleteCategory', authModel.checkLogin, authModel.isStaffOrManager, CateController.deleteByCate)
export default router;
