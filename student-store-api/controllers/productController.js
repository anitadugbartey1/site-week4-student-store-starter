// import productModel
const productModel = require("../models/productModel");

// Function gets all the products
const getAllProducts = async (req, res) => {
  const { name, category, minPrice, maxPrice, sort } = req.query;
  let filter = {}; // Filter object
  let orderBy = {}; // OrderBy - asc/desc

  if (name) {
    filter.name = {
      contains: name,
      mode: 'insensitive', // Case-insensitive filter
    };
  }
  if (category) {
    filter.category = category;
  }
  if (minPrice) {
    filter.price = {
      gte: parseInt(minPrice),
    };
  }
  if (maxPrice) {
    filter.price = filter.price || {};
    filter.price.lte = parseInt(maxPrice);
  }

  if (sort) {
    const [sortField, sortOrder] = sort.split(':');
    orderBy = {
      [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
    };
  }

  try {
    const products = await productModel.getAllProducts(filter, orderBy);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Function to get product by ID
const getProductsById = async (req, res) => {
  try {
    const product = await productModel.getProductsById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to create a new product
const createProducts = async (req, res) => {
  try {
    const { name, description, price, image_url, category } = req.body;
    const newProduct = await productModel.createProducts({
      name, description, price, image_url, category  
    });
    if (!name || !description || !price || !image_url || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to update a product
const udpateProducts = async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProducts(
      req.params.id,
      req.body
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to delete a product
const deleteProducts = async (req, res) => {
  try {
    const deletedProduct = await productModel.deleteProducts(req.params.id);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//export the functions
module.exports = {
  getAllProducts,
  getProductsById,
  createProducts,
  udpateProducts,
  deleteProducts,
};
