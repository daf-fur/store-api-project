const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(10) // chain the sort with the find to sort the data
    .skip(1);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {}; // queryObject will have whatever value we passed in

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    // if it exists, then set the queryObject's company to the actual company
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  console.log(queryObject);
  let result = Product.find(queryObject); // we have access to query and use that to basically find the product in the database with whatever's matching in the query string

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit)
// 23 
// 4 7 7 7 2



  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
