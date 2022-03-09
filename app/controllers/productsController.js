const debug = require('debug')('jquery:productsController');

function productsController(Product) {
  return { get, post };

  function get(req, res) {
    const query = {};
    if (req.query.color) {
      query.color = req.query.color;
    }
    debug('get: query', query);
    Product
      .find(query, (err, products) => {
        if (err) {
          return res.send(err);
        }
        const returnProducts = products
          .map((product) => {
            const newProduct = product.toJSON();
            newProduct.links = {};
            newProduct.links.self = `http://${req.headers.host}/api/products/${product._id}`;
            return newProduct;
          });
        return res.json(returnProducts);
      });
  }
  function post(req, res) {
    const { body } = req;
    debug('post: body', body);

    const product = new Product(body);
    if (!body.name) {
      res.status(400);
      return res.send('Product name is required...');
    }
    if (!body.productNumber) {
      res.status(400);
      return res.send('Product number is required...');
    }
    Product
      .findOne({ productNumber: product.productNumber }, (err, item) => {
        if (item !== null) {
          res.status(400);
          return res.send(`Product number [${product.productNumber}] is already in use...`);
        }
        product.save();
        res.status(201);
        return res.json(product);
      });
    return false;
  }
}

module.exports = productsController;
