import express from 'express';
import authController from '../auth/auth.controller.js';
import categoryMiddleware from './category.middleware.js'
import { validate } from 'express-validation'
import categoryController from './category.controller.js'
import { validateCategory } from './category.validation.js'
const router = express.Router();
router.post('/',
    validate(validateCategory),
    authController.isStaffOrManager,
    categoryController.addCategory)
router.get('/getList/:page',
    authController.isStaffOrManager,
    categoryController.getListCategory)
router.get('/:id',
    categoryMiddleware.validateId,
    authController.isStaffOrManager,
    categoryController.getCategory)
router.delete('/:id',
    categoryMiddleware.validateId,
    authController.isStaffOrManager,
    categoryController.deleteCategory)
router.put('/:id',
    categoryMiddleware.validateId,
    validate(validateCategory),
    authController.isStaffOrManager,
    categoryController.deleteCategory)
export default router;