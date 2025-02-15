/*
  Warnings:

  - You are about to drop the `ContactFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContactFolders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactFolder" DROP CONSTRAINT "ContactFolder_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactFolder" DROP CONSTRAINT "ContactFolder_folderId_fkey";

-- DropForeignKey
ALTER TABLE "_ContactFolders" DROP CONSTRAINT "_ContactFolders_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactFolders" DROP CONSTRAINT "_ContactFolders_B_fkey";

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "folderId" INTEGER;

-- DropTable
DROP TABLE "ContactFolder";

-- DropTable
DROP TABLE "_ContactFolders";

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
