// use router.js
import express from 'express';
import bodyParser from 'body-parser';
import db from './setup/mongoose.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';



//-----------------
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//-------------------
import userRoute from './api/user/user.router.js'
import cateRoute from './api/category/category.router.js'
import productRoute from './api/product/product.router.js'
import cartRoute from './api/cart/cart.router.js'
import orderRoute from './api/order/order.router.js'
import notifyRoute from './api/notify/notify.router.js'
import reportRoute from './api/report/report.router.js'
import searchRoute from './api/search/search.router.js'


//import cookieParser from 'cookie-parser'
db;
const app = express();
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

