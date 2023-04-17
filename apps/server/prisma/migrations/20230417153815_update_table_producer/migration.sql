/*
  Warnings:

  - You are about to drop the `CategoryEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionDisclosure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionIncomeProducer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionIncomeUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionPaymentTicket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `producers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_producer_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_ticket_type_id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionDisclosure" DROP CONSTRAINT "TransactionDisclosure_event_Id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionDisclosure" DROP CONSTRAINT "TransactionDisclosure_wallet_producer_Id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionIncomeProducer" DROP CONSTRAINT "TransactionIncomeProducer_wallet_producer_Id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionIncomeUser" DROP CONSTRAINT "TransactionIncomeUser_wallet_user_Id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionPaymentTicket" DROP CONSTRAINT "TransactionPaymentTicket_ticket_Id_fkey";

-- DropForeignKey
ALTER TABLE "TransactionPaymentTicket" DROP CONSTRAINT "TransactionPaymentTicket_wallet_user_Id_fkey";

-- AlterTable
ALTER TABLE "producers" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoryEvent";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "TicketType";

-- DropTable
DROP TABLE "TransactionDisclosure";

-- DropTable
DROP TABLE "TransactionIncomeProducer";

-- DropTable
DROP TABLE "TransactionIncomeUser";

-- DropTable
DROP TABLE "TransactionPaymentTicket";

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_types" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ticket_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "hour_start" TEXT NOT NULL,
    "hour_end" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "disclosed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" TEXT NOT NULL,
    "producer_id" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_income_user" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "wallet_user_Id" TEXT NOT NULL,

    CONSTRAINT "transaction_income_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_income_producer" (
    "id" TEXT NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "wallet_producer_Id" TEXT NOT NULL,

    CONSTRAINT "transaction_income_producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_disclosure" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "event_Id" TEXT NOT NULL,
    "wallet_producer_Id" TEXT NOT NULL,

    CONSTRAINT "transaction_disclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_payment_ticket" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "reference" TEXT NOT NULL,
    "ticket_Id" TEXT NOT NULL,
    "wallet_user_Id" TEXT NOT NULL,

    CONSTRAINT "transaction_payment_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_types_type_key" ON "ticket_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_disclosure_event_Id_key" ON "transaction_disclosure"("event_Id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_payment_ticket_reference_key" ON "transaction_payment_ticket"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_payment_ticket_ticket_Id_key" ON "transaction_payment_ticket"("ticket_Id");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_income_user" ADD CONSTRAINT "transaction_income_user_wallet_user_Id_fkey" FOREIGN KEY ("wallet_user_Id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_income_producer" ADD CONSTRAINT "transaction_income_producer_wallet_producer_Id_fkey" FOREIGN KEY ("wallet_producer_Id") REFERENCES "wallets_producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_disclosure" ADD CONSTRAINT "transaction_disclosure_event_Id_fkey" FOREIGN KEY ("event_Id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_disclosure" ADD CONSTRAINT "transaction_disclosure_wallet_producer_Id_fkey" FOREIGN KEY ("wallet_producer_Id") REFERENCES "wallets_producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_payment_ticket" ADD CONSTRAINT "transaction_payment_ticket_ticket_Id_fkey" FOREIGN KEY ("ticket_Id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_payment_ticket" ADD CONSTRAINT "transaction_payment_ticket_wallet_user_Id_fkey" FOREIGN KEY ("wallet_user_Id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
