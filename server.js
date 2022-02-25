const debug = require('debug')('jquery');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./app/models/productModel');
const productRouter = require('./app/routes/productRouter')(Product);

const appName = 'sheriff_interacting-with-data-using-jquery-and-ajax';
const port = process.env.PORT || 3e3;

mongoose
  .connect('mongodb://localhost:27017/productsApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const app = express();

debug('Booting... %o', appName);
app.use(logger('dev'));

// Base...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', productRouter);

// Export
if (require.main === module) {
  app.listen(port, () => {
    console.debug('Start: %s', new Date());
    console.debug(' Port: %d', port);
  });
} else {
  module.exports = app;
}
