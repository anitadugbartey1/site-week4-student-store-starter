const express = require("express");
const router = express.Router();
const orderitemsController = require("../controllers/orderitemsController");


// get all the products
router.get("/", orderitemsController.getAllOrderItems);
// //get products by ID
router.get("/:id", orderitemsController.getOrderItemsById);
// //add a new product
router.post("/", orderitemsController.createOrderItems); 
//create a new product
router.put("/:id", orderitemsController.updateOrderItems);


module.exports = router;