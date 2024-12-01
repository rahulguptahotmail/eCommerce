const { default: mongoose } = require("mongoose");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

// add product
const addproduct = async (req, res) => {
  try {
    const { title, imgPath, category, price, discount } = req.body;

    if (!title || !imgPath || !category || !price || !discount)
      return res.status(404).send({ message: "Enter All Boxes" });

    const newProduct = await productModel.create({
      title,
      imgPath,
      category,
      price,
      discount,
    });

    newProduct.save();
    return res.status(201).send({ message: "Product created successfully" });
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};

// total users

const totalUsers = async (req, res) => {
  try {
    const totalUsers = await userModel.find().countDocuments();
    const totalProducts = await productModel.find().countDocuments();
    res.status(200).send({ totalUsers, totalProducts });
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};

// products List

const productsList = async (req, res) => {
  try {
    const totalProducts = await productModel.find();
    res.status(200).send({ totalProducts });
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};

// delete Product

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id))
      res.status(404).send({ message: "Product not found" });
    await productModel.findByIdAndDelete(id);
    res.status(204).send({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};

// get single product
const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productModel.findById(id);
    return res.status(200).send({ product });
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};

// update product

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imgPath, category, price, discount } = req.body;
    await productModel.findByIdAndUpdate(id, {
      title,
      imgPath,
      category,
      price,
      discount,
    });
    res.status(200).send({ success: "ok" });
  } catch (err) {
    return res.status(500).send({ message: "try again" });
  }
};
module.exports = {
  addproduct,
  totalUsers,
  productsList,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};
