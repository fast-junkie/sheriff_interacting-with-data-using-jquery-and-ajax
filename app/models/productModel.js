const mongoose = require('mongoose');

const { Schema } = mongoose;
const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  productNumber: {
    type: String,
    unique: true,
    required: true,
  },
  color: { type: String },
  standardCost: { type: String },
  listPrice: { type: String },
  sellStartDate: { type: String, default: (new Date()).toISOString() },
  extant: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productModel);
