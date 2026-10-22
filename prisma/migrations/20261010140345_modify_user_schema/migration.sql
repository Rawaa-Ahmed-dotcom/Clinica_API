/*
  Warnings:

  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `governorate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "state",
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "governorate" SET NOT NULL;
