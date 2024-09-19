/*
  Warnings:

  - Added the required column `key` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "key" TEXT NOT NULL;
