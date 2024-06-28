const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// get all the products
router.get("/", productController.getAllProducts);
//get products by ID
router.get("/:id", productController.getProductsById);
//add a new product
router.post("/", productController.createProducts);
//create a new product
router.put("/:id", productController.udpateProducts);
//delete a product
router.delete("/:id", productController.deleteProducts);

module.exports = router;