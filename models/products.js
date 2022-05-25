const mongoose = require("mongoose");

//Schema
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    img: String,
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
  },
  { timestamps: true }
);

//create model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
