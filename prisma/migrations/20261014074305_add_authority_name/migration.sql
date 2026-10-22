/*
  Warnings:

  - Added the required column `issuing_authority` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IssuingAuthority" AS ENUM ('EGYPTIAN_MEDICAL_SYNDICATE', 'MINISTRY_OF_HEALTH');

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "issuing_authority" "IssuingAuthority" NOT NULL;
