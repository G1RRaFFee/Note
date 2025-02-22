/*
  Warnings:

  - A unique constraint covering the columns `[reservedFolderId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "reservedFolderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_reservedFolderId_key" ON "users"("reservedFolderId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_reservedFolderId_fkey" FOREIGN KEY ("reservedFolderId") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
