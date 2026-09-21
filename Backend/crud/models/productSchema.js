const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    category: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;