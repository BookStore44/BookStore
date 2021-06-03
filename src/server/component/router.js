//chua moi root de export ra nodejs
import userRoute from './user/user.router.js'
import cateRoute from './category/category.router.js'
import productRoute from './product/product.router.js'
import cartRoute from './cart/cart.router.js'
import orderRoute from './order/order.router.js'
import notifyRoute from './notify/notify.router.js'
import reportRoute from './report/report.router.js'
import { express, Router } from "express";
const router = Router();
router.use('/user', userRoute)
router.use('/category', cateRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)
router.use('/order', orderRoute)
router.use('/report', reportRoute)
router.use('/notify', notifyRoute)
export default router;