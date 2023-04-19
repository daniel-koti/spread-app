/*
  Warnings:

  - You are about to drop the column `type` on the `package_types` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `packages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `package_types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `package_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "package_types_type_key";

-- AlterTable
ALTER TABLE "package_types" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "package_types_name_key" ON "package_types"("name");
