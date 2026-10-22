/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `governorate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Governorate" AS ENUM ('CAIRO', 'GIZA', 'ALEXANDRIA', 'QALYUBIA', 'PORT_SAID', 'SUEZ', 'DAKAHLIA', 'SHARQIA', 'GHARBIA', 'MONUFIA', 'BEHEIRA', 'ISMAILIA', 'KAFR_EL_SHEIKH', 'DAMIETTA', 'FAYOUM', 'BENI_SUEF', 'MINYA', 'ASSIUT', 'SOHAG', 'QENA', 'LUXOR', 'ASWAN', 'RED_SEA', 'NEW_VALLEY', 'MATROUH', 'NORTH_SINAI', 'SOUTH_SINAI');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
ADD COLUMN     "city_id" INTEGER NOT NULL,
DROP COLUMN "governorate",
ADD COLUMN     "governorate" "Governorate" NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "governorate" "Governorate" NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "City_governorate_idx" ON "City"("governorate");

-- CreateIndex
CREATE UNIQUE INDEX "City_governorate_nameEn_key" ON "City"("governorate", "nameEn");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
