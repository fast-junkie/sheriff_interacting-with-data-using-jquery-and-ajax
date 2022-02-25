const express = require('express');
const productsController = require('../controllers/productsController');

function routes(Product) {
  const productRouter = express.Router();
  const controller = productsController(Product);

  productRouter
    .route('/products')
    .get(controller.get)
    .post((req, res) => {
      const product = new Product(req.body);
      product.save();
      return res.status(201).json(product);
    });

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
      const { product } = req;
      product.name = req.body.name;
      product.productNumber = req.body.productNumber;
      product.color = req.body.color;
      product.standardCost = req.body.standardCost;
      product.listPrice = req.body.listPrice;
      product.sellStartDate = req.body.sellStartDate;
      product.extant = req.body.extant;
      req
        .product
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
