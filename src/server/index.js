// use router.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserModel from './api/user/user.model.js'
import db from './setup/mongoose.js';
import jwt from 'jsonwebtoken'

import userRoute from './api/user/user.route.js'
import cateRoute from './api/category/category.route.js'
import productRoute from './api/product/product.route.js'
import cartRoute from './api/cart/cart.route.js'
import orderRoute from './api/order/order.route.js'
import notifyRoute from './api/notify/notify.route.js'
import reportRoute from './api/report/report.route.js'
import searchRoute from './api/search/search.route.js'
//import cookieParser from 'cookie-parser'
db;
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());


app.use('/user', userRoute)
app.use('/category', cateRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)
app.use('/report', reportRoute)
app.use('/notify', notifyRoute)
app.use('/search', searchRoute)
app.listen(3000, () => {
    console.log('start server');
});

