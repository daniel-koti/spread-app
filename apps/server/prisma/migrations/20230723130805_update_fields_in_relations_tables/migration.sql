/*
  Warnings:

  - Added the required column `tickets_qtd` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionsStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "tickets_qtd" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "file" TEXT,
ADD COLUMN     "status" "TransactionsStatus" NOT NULL DEFAULT 'SUCCESS';
