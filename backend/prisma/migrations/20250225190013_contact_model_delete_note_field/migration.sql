/*
  Warnings:

  - You are about to drop the column `noteId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_noteId_fkey";

-- DropIndex
DROP INDEX "contacts_noteId_key";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "noteId";

-- DropTable
DROP TABLE "notes";
