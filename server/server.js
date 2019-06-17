//get env file
require('dotenv').config({ path: __dirname + '/.env' });
//get express
const express = require('express');
//get body-parser
const bodyParser = require('body-parser');
//get cookies
const cookiesParser = require('cookie-parser');
//get error handler
const errorHandler = require('./handler/errorHandler');
//init express
const app = express();

/*******************************************************
 * SERVER MIDDLEWARES
 *  ******************************************************/
//to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//to support json-encoded bodies
app.use(bodyParser.json());
app.use(cookiesParser());

/*******************************************************
 * ROUTES
 *  ******************************************************/
const user = require('./routes/usersRoutes');
const product = require('./routes/productsRoutes');
const site = require('./routes/SiteRoutes');
app.use('/api/users', user);
app.use('/api/product', product);
app.use('/api/site', site);
/*******************************************************
 * DEFAULT ERROR
 *  ******************************************************/
//default route response
app.use(function(req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error); //move to next middleware
});
app.use(errorHandler);
/*******************************************************
 *SERVER START
 *  ******************************************************/
//user sever port or default 3002
const port = process.env.PORT || 3002;
//start the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
