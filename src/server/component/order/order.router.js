import express from 'express';
import authController from '../auth/auth.controller.js';

import { validate} from 'express-validation'
import orderController from './order.controller.js'
import orderMiddleware from './order.middleware.js'
import {validateOrder} from './order.validation.js'
const router = express.Router();
router.post('/',validate(validateOrder), authController.isUser, orderController.createOrder)
router.put('/:id', authController.isStaffOrManager,orderMiddleware.checkOrder, orderController.updateOrder)
router.get('/:id', authController.isStaffOrManager,orderMiddleware.validateId, orderController.getOrder)
export default router;
