const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Function gets all the cars
const getAllProducts = async (filter = {}, orderBy = {}) => {
    return prisma.product.findMany({
      where: filter,
      orderBy: orderBy,
    });
  };
  
  //Function to get car by ID
  const getProductsById = async (id) => {
    return prisma.product.findUnique({ where: { id: parseInt(id) } });
  };
  
  //Function to create a new car
  const createProducts =  (product) => {
    return prisma.product.create({ data: product });
  };
  
  //Function to update a car
  const updateProducts = async (id, product) => {
    return prisma.product.update({
      where: { id: parseInt(id) },
      data: product,
    });
  };
  
  //Function to delete a car
  const deleteProducts = async (id) => {
    return prisma.product.delete({ where: { id: parseInt(id) } });
  };
  
  //export the functions
  module.exports = {
    getAllProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts,
  };