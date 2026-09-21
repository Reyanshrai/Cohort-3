const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("./models/productSchema");

const app = express();

app.use(express.json());

const port = 3000;
const mongodb_uri = "mongodb://127.0.0.1:27017/practice";

const mongodb = () => {
  mongoose
    .connect(mongodb_uri)
    .then(() => {
      console.log("Db is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

mongodb();

const API = "https://fakestoreapi.com/products";

app.get("/", (req, res) => {
  res.send("Hiii");
});

app.get("/products", (req, res) => {
  axios
    .get(API)
    .then((res) => {
      const data = res.data;

      console.log("data", data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API}/${id}`);
    const data = response.data;

    const productData = await Product.create({
      id: data.id,
      title: data.title,
      price: data.price,
      category: data.category,
    });
    
    console.log("Product:", productData);
    res.json(productData);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
