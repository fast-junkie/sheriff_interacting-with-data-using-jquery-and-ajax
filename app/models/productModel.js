const mongoose = require('mongoose');

const { Schema } = mongoose;
const productModel = new Schema({
  name: { type: String },
  productNumber: { type: String },
  color: { type: String },
  standardCost: { type: String },
  listPrice: { type: String },
  extant: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productModel);
