/*
  Warnings:

  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "customerId",
DROP COLUMN "orderId",
DROP COLUMN "totalPrice",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "order_id" SERIAL NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id");

-- CreateTable
CREATE TABLE "OrderItems" (
    "orderItemId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("orderItemId")
);
