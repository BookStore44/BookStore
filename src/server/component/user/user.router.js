import express from 'express';
import authController from '../auth/auth.controller.js';
import userMiddleware from './user.middleware.js'
import { validate } from 'express-validation'
import userController from './user.controller.js'
import { validateUser, validateRole } from './user.validation.js'
import multer from 'multer';
import { upload } from '../../const/saveImage.js'
const router = express.Router();
router.post('/signUp',
    validate(validateUser),
    userMiddleware.isExistUsername,
    userController.signUp);
router.post('/signIn',
    validate(validateUser),
    userController.signIn);
router.put('/avatar',
    upload.single('avatar'),
    authController.checkLogin,
    userController.updateAvatar);
router.put('/update',
    validate(validateUser),
    authController.checkLogin,
    userController.updateUser);
//Permission of manager & Staff
router.get('/getUser/:id',
    userMiddleware.validateId,
    authController.isStaffOrManager,
    userController.getUser);
//Permission of manager
router.put('/changePermission/:id',
    validate(validateRole),
    userMiddleware.validateId,
    authController.isManager,
    userController.changePermission);
router.get('/getListStaff/:page',
    authController.isManager,
    userController.getListStaff);
router.delete('/deleteStaff/:id',
    userMiddleware.validateId,
    authController.isManager,
    userController.deleteUser);
export default router;

