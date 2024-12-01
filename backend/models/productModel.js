const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  imgPath: { type: String,required: true },
  price: { type: String, required: true },
  discount: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
