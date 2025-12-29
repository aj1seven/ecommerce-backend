const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
