const mongoose = require("mongoose");

////create schema//////
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    img: String,
    price: { type: Number, min: 1 },
    qty: { type: Number, min: 1 },
  },
  { timestamps: true }
);

////create model/////
const Product = mongoose.model("Product", productSchema);

////export/////
module.exports = Product;
