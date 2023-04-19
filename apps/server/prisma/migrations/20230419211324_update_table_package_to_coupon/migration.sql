/*
  Warnings:

  - You are about to drop the column `package_type_id` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `package_Id` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `coupon_type_id` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coupon_Id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_package_type_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_package_Id_fkey";

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "package_type_id",
ADD COLUMN     "coupon_type_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "package_Id",
ADD COLUMN     "coupon_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_coupon_type_id_fkey" FOREIGN KEY ("coupon_type_id") REFERENCES "package_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_coupon_Id_fkey" FOREIGN KEY ("coupon_Id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
