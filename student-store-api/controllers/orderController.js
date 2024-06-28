// import orderModel
const orderModel = require("../models/order");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to get product by ID
const getOrdersById = async (req, res) => {
  try {
    const order = await orderModel.getOrdersById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to create a new product
const createOrders = async (req, res) => {
  try {
    
    const newOrder = await orderModel.createOrders(req.body);
    res.status(201).json(newOrder);
    console.log("success")
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
};


//Function to update a product
const udpateOrders = async (req, res) => {
  try {
    const updatedOrder = await orderModel.updateOrders(req.params.id, req.body);
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to delete a product
const deleteOrders = async (req, res) => {
  try {
    const deletedOrder = await orderModel.deleteOrders(req.params.id);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addItemsToOrder = async (req, res) => {
  const {order_id}  = req.params;
  const items  = req.body; // Items should be an array of objects {productId, quantity, price}

  try {
    orderModel.addItemsToOrder(items, order_id);
    res.status(201).json({ message: "Items added to order successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const calculateOrderTotal = async (req, res) => {
  
  const { order_id } = req.params;
  
  try {
    const order = await prisma.orders.findUnique({
      where: { order_id: parseInt(order_id) },
      include: { orderItems : true }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    
    const total = order.orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    res.status(200).json({ total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//export the functions
module.exports = {
  getAllOrders,
  getOrdersById,
  createOrders,
  udpateOrders,
  deleteOrders,
  addItemsToOrder,
  calculateOrderTotal
};