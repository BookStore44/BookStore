// use router.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserModel from './api/user/user.model.js'
import db from './setup/mongoose.js';
import jwt from 'jsonwebtoken'
import argv from 'minimist'
import swagger from 'swagger-node-express'
import path from 'path'
//-----------------
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//-------------------
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

// //SWAGGER
const subpath = express();
app.use("/v1", subpath);
app.use(express.static('dist'));
swagger.setAppHandler(subpath);
swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});
subpath.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});
swagger.configureSwaggerPaths('', 'api-docs', '');

const domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');
const applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');
// //-------------------


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

