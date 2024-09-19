/*
  Warnings:

  - You are about to drop the column `userAAnswer` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `userBAnswer` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "userAAnswer",
DROP COLUMN "userBAnswer";
