const { default: mongoose } = require("mongoose");
const productModel = require("../models/productModel");

const AddProduct = async (req, res) => {
  try {
    const { category, title, model, price, discount } = req.body;

    const newProduct = await productModel.create({
      category,
      title,
      model,
      price,
      discount,
    });

    await newProduct.save();

    res.status(200).send({ message: "Success" });
  } catch (err) {
    return res.status(500).send({ message: "try Again" });
  }
};

// get product
const GetProduct = async (req, res) => {
  try {
    const product = await productModel.find();

    res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: "try Again" });
  }
};

// get single product
const GetSingleProduct = async (req, res) => {
  try {
    const product = req.params.product;
    
    const result = await productModel.find({ category: product });
    res.send(result);
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};

// searchedproduct
const searchedproduct = async (req, res) => {
  try {
    const id = req.params.product;
    let tempProduct = null;

    // check mongoose id
    if (mongoose.isValidObjectId(id)) tempProduct = await productModel.find();
    else return res.status(404).send({ message: "Invalid User" });

    // check tempProduct
    if (!tempProduct)
      return res.status(404).send({ message: "Product not found" });

    // single product
    const product = tempProduct.filter(
      (item) => JSON.stringify(item._id) === JSON.stringify(id)
    );

    // allProducts
    const allProducts = tempProduct.filter(
      (item) =>
        JSON.stringify(item._id) !== JSON.stringify(id) &&
        item.category === product[0].category
    );
    res
      .status(200)
      .send({ message: "success", product: product[0], allProducts });
  } catch (err) {
    return res.status(500).send({ message: "error" });
  }
};

// search algorithms
const searchAlgorithms = async (req, res) => {
  try {
    // value from the user
    const value = req.query.value;

    // database query
    const products = await productModel.find();

    // searchAlgorithm
    const product = products.filter(
      (item) =>
        item.title.slice(0, value.length) === value ||
        item.category.slice(0, value.length) === value
    );
    return res.status(200).send({ message: "Search Success", product });
  } catch (err) {
    return res.status(500).send({ message: "error" });
  }
};

module.exports = {
  AddProduct,
  GetProduct,
  GetSingleProduct,
  searchedproduct,
  searchAlgorithms,
};
