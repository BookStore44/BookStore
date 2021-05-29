// use router.js
import express from 'express';
import bodyParser from 'body-parser';
import db from './setup/mongoose.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import router from './component/router.js';

import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

//-----------------
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//-------------------



//import cookieParser from 'cookie-parser'
db;
const app = express();
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.use(cookieParser());
app.use("", router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use((error, req, res, next) => {
    if (error.details) {
      error.details.body.forEach((element) => {
        error.message = element.message;
      });
      return res.status(error.statusCode || 500).json({
        error: {
          status: error.statusCode || 500,
          message: error.message || "Internal Server Error",
        },
      });
    }
    return res.status(error.httpCode || 500).json({
      error: {
        status: error.httpCode || 500,
        message: error.message || "Internal Server Error",
      },
    });
  });
app.listen(process.env.PORT, () => {
    console.log('start server');
});

