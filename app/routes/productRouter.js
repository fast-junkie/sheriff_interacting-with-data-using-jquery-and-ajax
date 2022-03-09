const debug = require('debug')('jquery:productRouter');
const express = require('express');
const productsController = require('../controllers/productsController');

function routes(Product) {
  const productRouter = express.Router();
  const controller = productsController(Product);

  productRouter
    .route('/products')
    .get(controller.get)
    .post(controller.post);

  productRouter
    .use('/products/:id', (req, res, next) => {
      Product
        .findById(req.params.id, (err, product) => {
          debug('req.params.id', req.params.id);
          if (err) {
            return res.send(err);
          }
          if (product) {
            req.product = product;
            return next();
          }
          return res.sendStatus(404);
        });
    });

  productRouter
    .route('/products/:id')
    .get((req, res) => res.json(req.product))
    .put((req, res) => {
      const { body, product } = req;
      debug('put: body', body);
      product.name = body.name;
      product.productNumber = body.productNumber;
      product.color = body.color;
      product.standardCost = body.standardCost;
      product.listPrice = body.listPrice;
      product.sellStartDate = body.sellStartDate;
      product.extant = body.extant;

      product
        .save((err) => {
          if (err) {
            return res.send(err);
          }
          return res.json(product);
        });
    })
    .patch((req, res) => {
      const { body, product } = req;
      debug('patch: body', body);
      if (body._id) {
        delete body._id;
      }
      Object
        .entries(body)
        .forEach((item) => {
          const [key, value] = item;
          product[key] = value;
        });
      req
        .product
        .save((err) => {
          if (err) {
            return res.send(err);
          }
          return res.json(product);
        });
    })
    .delete((req, res) => {
      const { product } = req;
      debug('delete: product', product);
      product
        .remove((err) => {
          if (err) {
            return res.send(err);
          }
          return res.json({ status: 204, statusText: 'Product deleted...' });
        });
    });

  return productRouter;
}

module.exports = routes;
