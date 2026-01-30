const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({page:'2'})
  res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
  const {featured} = req.query

  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true: false
  }

  const products = await Product.find(featured) // we have access to query and use that to basically find the product in the database with whatever's matching in the query string
  res.status(200).json({ products, nbHits:products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
