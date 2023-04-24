/*
  Warnings:

  - You are about to drop the column `event_Id` on the `disclosures` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_Id` on the `disclosures` table. All the data in the column will be lost.
  - You are about to drop the column `coupon_Id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `event_Id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_Id` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id]` on the table `disclosures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transaction_id]` on the table `disclosures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transaction_id]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_id` to the `disclosures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `disclosures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coupon_id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "disclosures" DROP CONSTRAINT "disclosures_event_Id_fkey";

-- DropForeignKey
ALTER TABLE "disclosures" DROP CONSTRAINT "disclosures_transaction_Id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_coupon_Id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_Id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_transaction_Id_fkey";

-- DropIndex
DROP INDEX "coupon_types_name_key";

-- DropIndex
DROP INDEX "disclosures_event_Id_key";

-- DropIndex
DROP INDEX "disclosures_transaction_Id_key";

-- DropIndex
DROP INDEX "tickets_transaction_Id_key";

-- AlterTable
ALTER TABLE "disclosures" DROP COLUMN "event_Id",
DROP COLUMN "transaction_Id",
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "coupon_Id",
DROP COLUMN "createdAt",
DROP COLUMN "event_Id",
DROP COLUMN "transaction_Id",
ADD COLUMN     "coupon_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "disclosures_event_id_key" ON "disclosures"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "disclosures_transaction_id_key" ON "disclosures"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_transaction_id_key" ON "tickets"("transaction_id");

-- AddForeignKey
ALTER TABLE "disclosures" ADD CONSTRAINT "disclosures_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disclosures" ADD CONSTRAINT "disclosures_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
