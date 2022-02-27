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
      const { product } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object
        .entries(req.body)
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
      req
        .product
        .remove((err) => {
          if (err) {
            return res.send(err);
          }
          return res.sendStatus(204);
        });
    });

  return productRouter;
}

module.exports = routes;
