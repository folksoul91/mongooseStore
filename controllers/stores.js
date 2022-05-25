const express = require("express");
const Product = require("../models/products");
const router = express.Router();

// Routes / Controllers
// Seed
const seedData = require("../models/seedData");

router.get("/seed", (req, res) => {
  Product.deleteMany({}, (error, allBooks) => {});
  Product.create(seedData, (error, data) => {
    res.redirect("/store");
  });
});

// Index
router.get("/", (req, res) => {
  Product.find({}, (error, products) => {
    res.render("index.ejs", { allProducts: products });
  });
});

//New
router.post("/", (req, res) => {
  Product.create(req.body, (err, product) => {
    res.redirect("/store");
  });
});

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Show
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("show.ejs", {
      productObj: product,
    });
  });
});

// Buy
router.put("/:id", (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    let originalQty = product.qty;
    Product.findByIdAndUpdate(
      req.params.id,
      { qty: originalQty - req.body.qty },
      { new: true },
      (error, product) => {
        res.redirect(`/store/${req.params.id}`);
      }
    );
  });
});

// Update
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateProduct) => {
      res.redirect(`/store/${req.params.id}`);
    }
  );
});

//edit
router.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("edit.ejs", {
      productObj: product,
    });
  });
});

// Delete
router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    res.redirect("/store");
  });
});

module.exports = router;
