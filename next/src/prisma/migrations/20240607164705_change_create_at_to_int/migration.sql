/*
  Warnings:

  - Changed the type of `createdAt` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL;
