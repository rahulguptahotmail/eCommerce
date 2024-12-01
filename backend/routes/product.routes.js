const {
  AddProduct,
  GetProduct,
  GetSingleProduct,
  searchedproduct,
  searchAlgorithms,
} = require("../controller/product.controller");

const Router = require("express").Router();

Router.post("/product", AddProduct);
Router.get("/product", GetProduct);
Router.get("/singleproduct/:product", GetSingleProduct);
Router.get("/searchedproduct/:product",searchedproduct);
Router.get("/searchalgorithms",searchAlgorithms)

module.exports = Router;
