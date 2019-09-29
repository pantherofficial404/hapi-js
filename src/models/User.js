const mongoose = require('mongoose');
const { SchemaOptions } = require('models');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: mongoose.Schema.Types.String,
      require: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      require: true
    },
  },
  SchemaOptions
)

module.exports = mongoose.model('User', userSchema);