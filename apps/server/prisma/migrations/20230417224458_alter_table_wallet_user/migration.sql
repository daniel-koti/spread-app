/*
  Warnings:

  - You are about to drop the column `password` on the `producers` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_producer_Id` on the `transaction_disclosure` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_producer_Id` on the `transaction_income_producer` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_user_Id` on the `transaction_income_user` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_user_Id` on the `transaction_payment_ticket` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `producers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_wallet_producer` to the `transaction_disclosure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_wallet_producer` to the `transaction_income_producer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_wallet_user` to the `transaction_income_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_wallet_user` to the `transaction_payment_ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_disclosure" DROP CONSTRAINT "transaction_disclosure_wallet_producer_Id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_income_producer" DROP CONSTRAINT "transaction_income_producer_wallet_producer_Id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_income_user" DROP CONSTRAINT "transaction_income_user_wallet_user_Id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_payment_ticket" DROP CONSTRAINT "transaction_payment_ticket_wallet_user_Id_fkey";

-- AlterTable
ALTER TABLE "producers" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction_disclosure" DROP COLUMN "wallet_producer_Id",
ADD COLUMN     "id_wallet_producer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction_income_producer" DROP COLUMN "wallet_producer_Id",
ADD COLUMN     "id_wallet_producer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction_income_user" DROP COLUMN "wallet_user_Id",
ADD COLUMN     "id_wallet_user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction_payment_ticket" DROP COLUMN "wallet_user_Id",
ADD COLUMN     "id_wallet_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction_income_user" ADD CONSTRAINT "transaction_income_user_id_wallet_user_fkey" FOREIGN KEY ("id_wallet_user") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_income_producer" ADD CONSTRAINT "transaction_income_producer_id_wallet_producer_fkey" FOREIGN KEY ("id_wallet_producer") REFERENCES "wallets_producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_disclosure" ADD CONSTRAINT "transaction_disclosure_id_wallet_producer_fkey" FOREIGN KEY ("id_wallet_producer") REFERENCES "wallets_producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_payment_ticket" ADD CONSTRAINT "transaction_payment_ticket_id_wallet_user_fkey" FOREIGN KEY ("id_wallet_user") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
