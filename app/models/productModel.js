const mongoose = require('mongoose');

const { Schema } = mongoose;
const productModel = new Schema({
  name: { type: String },
  productNumber: { type: String },
  color: { type: String },
  standardCost: { type: String },
  listPrice: { type: String },
  sellStartDate: { type: String, default: new Date().toLocaleDateString() },
  extant: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productModel);
