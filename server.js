// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/products");
require("dotenv").config();
const seedData = require("./models/seedData");

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Database Connection Error/Success
//Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo is connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Routes / Controllers
// Seed
app.get("/store/seed", (req, res) => {
  Product.deleteMany({}, (error, allBooks) => {});
  Product.create(seedData, (error, data) => {
    res.redirect("/store");
  });
});

// Index
app.get("/store", (req, res) => {
  Product.find({}, (error, products) => {
    res.render("index.ejs", { allProducts: products });
  });
});

//New
app.post("/store", (req, res) => {
  Product.create(req.body, (err, product) => {
    res.redirect("/store");
  });
});

app.get("/store/new", (req, res) => {
  res.render("new.ejs");
});

//Show
app.get("/store/:id", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("show.ejs", {
      productObj: product,
    });
  });
});

// Update
app.patch("/store/:id", (req, res) => {
  Product.findById(req.params.id, (err, updateProduct) => {
    updateProduct.qty = updateProduct.qty - 1;
    updateProduct.save();
  });
  res.redirect(`/store/${req.params.id}`);
});
//edit
app.get("/store/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("edit.ejs", {
      productObj: product,
    });
  });
});
// Delete
app.delete("/store/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    res.redirect("/store");
  });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
