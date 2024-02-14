require("dotenv").config();

// Frame work
const express = require("express");

// mangoose
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//initializing  express
const booky = express();

//configure
booky.use(express.json());

// Establish database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection established!!!!!"));

// initilizing  microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);


booky.listen(3000, () => console.log("hey server is running 🚀"));
