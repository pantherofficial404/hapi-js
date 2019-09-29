const { Product } = require('models');

const addProduct = async (req, res) => {
  const { productName, price, description } = req.payload;
  const product = await new Product({
    productName,
    price,
    description
  }).save();
  return {
    statusCode: 200,
    data: {
      product,
    }
  }
}

const listProduct = async (req, res) => {
  const products = await Product.find();
  return {
    statusCode: 200,
    data: {
      products,
    },
  }
}

module.exports = {
  addProduct,
  listProduct,
}