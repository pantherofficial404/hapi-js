const mongoose = require('mongoose');
const { SchemaOptions } = require('models');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    price: {
      type: mongoose.Schema.Types.Number,
      require: true
    },
    description: {
      type: mongoose.Schema.Types.String,
      require: true
    }
  },
  SchemaOptions
);

module.exports = mongoose.model('Product', productSchema);