/*
  Warnings:

  - You are about to drop the column `userB` on the `Session` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userB",
ADD COLUMN     "userBId" TEXT;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
