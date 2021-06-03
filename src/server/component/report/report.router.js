import express from 'express';
import authController from '../auth/auth.controller.js';

import { validate, ValidationError, Joi } from 'express-validation'
import reportController from './report.controller.js'

const router = express.Router();
router.put('/reportByProduct', authController.checkLogin, authController.isStaffOrManager, reportController.reportByProduct)
router.put('/reportByCategory', authController.checkLogin, authController.isStaffOrManager, reportController.reportByCategory)
export default router;
