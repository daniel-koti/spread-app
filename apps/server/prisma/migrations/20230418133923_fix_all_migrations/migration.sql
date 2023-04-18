/*
  Warnings:

  - You are about to drop the column `event_id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_type_id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `wallets` table. All the data in the column will be lost.
  - You are about to drop the `categories_events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_disclosure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_income_producer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_income_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_payment_ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallets_producer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[wallet_id]` on the table `producers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transaction_Id]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet_id` to the `producers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_Id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package_Id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_Id` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionsType" AS ENUM ('INCOME', 'OUTCOME');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_event_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_ticket_type_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_disclosure" DROP CONSTRAINT "transaction_disclosure_event_Id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_disclosure" DROP CONSTRAINT "transaction_disclosure_id_wallet_producer_fkey";

-- DropForeignKey
ALTER TABLE "transaction_income_producer" DROP CONSTRAINT "transaction_income_producer_id_wallet_producer_fkey";

-- DropForeignKey
ALTER TABLE "transaction_income_user" DROP CONSTRAINT "transaction_income_user_id_wallet_user_fkey";

-- DropForeignKey
ALTER TABLE "transaction_payment_ticket" DROP CONSTRAINT "transaction_payment_ticket_id_wallet_user_fkey";

-- DropForeignKey
ALTER TABLE "transaction_payment_ticket" DROP CONSTRAINT "transaction_payment_ticket_ticket_Id_fkey";

-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "wallets_producer" DROP CONSTRAINT "wallets_producer_producer_id_fkey";

-- DropIndex
DROP INDEX "wallets_user_id_key";

-- AlterTable
ALTER TABLE "producers" ADD COLUMN     "wallet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "event_id",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "ticket_type_id",
ADD COLUMN     "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_Id" TEXT NOT NULL,
ADD COLUMN     "package_Id" TEXT NOT NULL,
ADD COLUMN     "reference" TEXT NOT NULL,
ADD COLUMN     "transaction_Id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "wallet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "categories_events";

-- DropTable
DROP TABLE "ticket_types";

-- DropTable
DROP TABLE "transaction_disclosure";

-- DropTable
DROP TABLE "transaction_income_producer";

-- DropTable
DROP TABLE "transaction_income_user";

-- DropTable
DROP TABLE "transaction_payment_ticket";

-- DropTable
DROP TABLE "wallets_producer";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "type" "TransactionsType" NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,
    "wallet_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "event_id" TEXT NOT NULL,
    "package_type_id" TEXT NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_types" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "package_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disclosures" (
    "id" TEXT NOT NULL,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "event_Id" TEXT NOT NULL,
    "transaction_Id" TEXT NOT NULL,

    CONSTRAINT "disclosures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "package_types_type_key" ON "package_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "disclosures_event_Id_key" ON "disclosures"("event_Id");

-- CreateIndex
CREATE UNIQUE INDEX "disclosures_transaction_Id_key" ON "disclosures"("transaction_Id");

-- CreateIndex
CREATE UNIQUE INDEX "producers_wallet_id_key" ON "producers"("wallet_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_reference_key" ON "tickets"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_transaction_Id_key" ON "tickets"("transaction_Id");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_id_key" ON "users"("wallet_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producers" ADD CONSTRAINT "producers_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_package_type_id_fkey" FOREIGN KEY ("package_type_id") REFERENCES "package_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disclosures" ADD CONSTRAINT "disclosures_event_Id_fkey" FOREIGN KEY ("event_Id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disclosures" ADD CONSTRAINT "disclosures_transaction_Id_fkey" FOREIGN KEY ("transaction_Id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_transaction_Id_fkey" FOREIGN KEY ("transaction_Id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_Id_fkey" FOREIGN KEY ("event_Id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_package_Id_fkey" FOREIGN KEY ("package_Id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
