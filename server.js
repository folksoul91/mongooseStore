// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const storeController = require("./controllers/stores");
require("dotenv").config();

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use("/store", storeController);

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

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
