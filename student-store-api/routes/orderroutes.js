const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


// get all the products
router.get("/", orderController.getAllOrders);
//get products by ID
router.get("/:id", orderController.getOrdersById);
//add a new product
router.post("/", orderController.createOrders);
//create a new product
router.put("/:id", orderController.udpateOrders);
//delete a product
router.delete("/:id", orderController.deleteOrders);
// Add items to order
router.post('/:order_id/items', orderController.addItemsToOrder);

// Calculate order total
router.get('/:order_id/total', orderController.calculateOrderTotal);


module.exports = router;