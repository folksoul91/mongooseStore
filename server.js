// Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const methodOverride = require("method-override");
const storeController = require("./controllers/mongooseStore");

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
