const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Function gets all the cars
const getAllOrders = async () => {
    return prisma.orders.findMany();
  };
  
  //Function to get car by ID
  const getOrdersById = async (id) => {
    console.log(id)
    return prisma.orders.findUnique({ where: { id: parseInt(id) } });
  };
  
  //Function to create a new car
  const createOrders = async (order) => {
    const newOrder = await prisma.orders.create({ data: {
      customer_id  : order.customer_id,
      total_price :  order.total_price,
      status: order.status
    } });
console.log(newOrder)
    addItemsToOrder(order.orderItems, newOrder.order_id)
    // add order items
    // update total price

  };
  
const addItemsToOrder = async (orderItems, orderId) => {
    const items = orderItems.map((item) => ({
      productId: item.product_id,
      quantity: item.quantity,
      price: item.price,
      orderId: orderId
  }));

   return  await prisma.orderItem.createMany({ data: items });
}
    

  //Function to update a car
  const updateOrders = async (id, orders) => {
    return prisma.orders.update({
      where: { id: parseInt(id) },
      data: orders,
    });
  };
  
  //Function to delete a car
  const deleteOrders = async (id) => {
    return prisma.order.delete({ where: { id: parseInt(id) } });
  };

  
  //export the functions
  module.exports = {
    getAllOrders,
    getOrdersById,
    createOrders,
    updateOrders,
    deleteOrders
  };