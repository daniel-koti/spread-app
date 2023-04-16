-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "ApproveStatus" AS ENUM ('APPROVED', 'RECUSED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ENABLED';

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "company" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ENABLED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets_producer" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "producer_id" TEXT NOT NULL,

    CONSTRAINT "wallets_producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
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

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryEvent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionIncomeUser" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "wallet_user_Id" TEXT NOT NULL,

    CONSTRAINT "TransactionIncomeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionIncomeProducer" (
    "id" TEXT NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "wallet_producer_Id" TEXT NOT NULL,

    CONSTRAINT "TransactionIncomeProducer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionDisclosure" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "event_Id" TEXT NOT NULL,
    "wallet_producer_Id" TEXT NOT NULL,

    CONSTRAINT "TransactionDisclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionPaymentTicket" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "initial_amount" DECIMAL(65,30) NOT NULL,
    "remaining_amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approve_status" "ApproveStatus" NOT NULL DEFAULT 'APPROVED',
    "reference" TEXT NOT NULL,
    "ticket_Id" TEXT NOT NULL,
    "wallet_user_Id" TEXT NOT NULL,

    CONSTRAINT "TransactionPaymentTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "producers_email_key" ON "producers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_producer_producer_id_key" ON "wallets_producer"("producer_id");

-- CreateIndex
CREATE UNIQUE INDEX "TicketType_type_key" ON "TicketType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionDisclosure_event_Id_key" ON "TransactionDisclosure"("event_Id");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionPaymentTicket_reference_key" ON "TransactionPaymentTicket"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionPaymentTicket_ticket_Id_key" ON "TransactionPaymentTicket"("ticket_Id");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets_producer" ADD CONSTRAINT "wallets_producer_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CategoryEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionIncomeUser" ADD CONSTRAINT "TransactionIncomeUser_wallet_user_Id_fkey" FOREIGN KEY ("wallet_user_Id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionIncomeProducer" ADD CONSTRAINT "TransactionIncomeProducer_wallet_producer_Id_fkey" FOREIGN KEY ("wallet_producer_Id") REFERENCES "wallets_producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDisclosure" ADD CONSTRAINT "TransactionDisclosure_event_Id_fkey" FOREIGN KEY ("event_Id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDisclosure" ADD CONSTRAINT "TransactionDisclosure_wallet_producer_Id_fkey" FOREIGN KEY ("wallet_producer_Id") REFERENCES "wallets_producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPaymentTicket" ADD CONSTRAINT "TransactionPaymentTicket_ticket_Id_fkey" FOREIGN KEY ("ticket_Id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPaymentTicket" ADD CONSTRAINT "TransactionPaymentTicket_wallet_user_Id_fkey" FOREIGN KEY ("wallet_user_Id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
