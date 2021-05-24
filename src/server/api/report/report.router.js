import express from 'express';
import authModel from '../../middleware/auth.js';
//import CartMiddleware from './cart.middleware.js'
import { validate, ValidationError, Joi } from 'express-validation'
import ReportController from './report.controller.js'
//import ReportMiddleware from './report.middleware.js'
const router = express.Router();
router.put('/reportbyProduct', authModel.checkLogin, authModel.isStaffOrManager, ReportController.reportbyProduct)
router.put('/reportbyCategory', authModel.checkLogin, authModel.isStaffOrManager, ReportController.reportbyCategory)
//router.put('/updateStatus', authModel.checkLogin, authModel.isStaffOrManager,OrderMiddleware.checkstatus, OrderController.updateStatus)
export default router;
