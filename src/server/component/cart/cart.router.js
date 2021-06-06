import express from 'express';
import authController from '../auth/auth.controller.js';

import cartController from './cart.controller.js'
import CartMiddleware from './cart.middleware.js'
const router = express.Router();
router.get('/cartByUserId', authController.isUser, cartController.CartByUserId)
router.put('/updateCart', authController.isUser, CartMiddleware.checkExistProductId ,cartController.updateCart)
export default router;

