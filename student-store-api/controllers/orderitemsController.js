const orderItemModel = require("../models/orderitems");
// Function gets all the cars
const getAllOrderItems = async (req, res) => {
  try {
    const ordersItems = await orderItemModel.getAllOrderItems();   
    res.status(200).json(ordersItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Function to get car by ID
const getOrderItemsById = async (req, res) => {
  try {
    const orderItem = await orderItemModel.getOrderItemById(req.params.order_item_id);
    if (orderItem) {
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Function to create a new car
const createOrderItems = async (req, res) => {
  try {
    const { orderId, productId, quantity, price } = req.body;
    console.log(req.body)

    // Ensure all necessary fields are provided
    // if (!orderId || !productId || !quantity || !price) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    const newOrderItem = await orderItemModel.createOrderItem({
      orderId,
      productId,
      quantity,
      price,
    });
console.log("new item",newOrderItem)
    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Function to update a car
//THIS WORKS DO NOT DELETE
/*const udpateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await orderItemModel.updateOrderItem(req.params.id, req.body);
    if (updatedOrderItem) {
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};*/
const updateOrderItems = async (req, res) => {
  try {
    const updatedOrderItem = await orderItemModel.updateOrderItems(req.params.order_item_id, req.body);
    if (updatedOrderItem) {
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Function to delete a car
const deleteOrderItems = async (req, res) => {
  try {
    const deletedOrderItem = await orderItemModel.deleteOrderItem(req.params.id);
    if (deletedOrderItem) {
      res.status(200).json(deletedOrderItem);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//export the functions
module.exports = {
  getAllOrderItems,
  getOrderItemsById,
  createOrderItems,
  updateOrderItems,
  deleteOrderItems,
};