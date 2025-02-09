/*
  Warnings:

  - You are about to drop the column `name` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "name",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "middleName" TEXT;
