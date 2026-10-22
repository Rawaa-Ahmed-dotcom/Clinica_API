/*
  Warnings:

  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city_id` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `governorate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city_id" SET NOT NULL,
ALTER COLUMN "governorate" SET NOT NULL;
