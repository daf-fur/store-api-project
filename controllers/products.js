const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {}; // queryObject will have whatever value we passed in

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    // if it exists, then set the queryObject's company to the actual company
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = name;
  }

  console.log(queryObject);
  const products = await Product.find(queryObject); // we have access to query and use that to basically find the product in the database with whatever's matching in the query string
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
