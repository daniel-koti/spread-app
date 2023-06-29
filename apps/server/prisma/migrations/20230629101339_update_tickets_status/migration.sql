/*
  Warnings:

  - You are about to drop the column `approve_status` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the `UserTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('USED', 'EXPIRED', 'VALID', 'INVALID');

-- DropForeignKey
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_user_id_fkey";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "approve_status",
ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'VALID';

-- DropTable
DROP TABLE "UserTokens";
