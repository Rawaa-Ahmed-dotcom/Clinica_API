/*
  Warnings:

  - Added the required column `expiry_date` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "expiry_date" DATE NOT NULL;
