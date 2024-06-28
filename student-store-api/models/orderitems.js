const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const getAllOrderItems = async() => {
    return prisma.orderItem.findMany();
};
const getOrderItemsById = async (order_item_id) => {
    return prisma.orderItem.findUnique({
        where: {
            order_item_id: parseInt(order_item_id)
        }
    });
};
//adding the orderItems as an array
const createOrderItem = async(orderItemsData) => {
    try{
        const newOrderItems = await prisma.orderItem.create({
            data: {
                orderId: orderItemsData.orderId,
                productId: orderItemsData.productId,
                quantity: orderItemsData.quantity,
                price: orderItemsData.price,
            }
        });
        return newOrderItems;
    } catch (error) {
        throw new Error(`Error creating order item: ${error.message}`);
    }
};
module.exports = {
    getAllOrderItems,
    getOrderItemsById,
    createOrderItem,
}