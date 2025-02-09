/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");
