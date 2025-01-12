/*
  Warnings:

  - You are about to drop the `ContactFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContactFolders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `folders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactFolder" DROP CONSTRAINT "ContactFolder_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactFolder" DROP CONSTRAINT "ContactFolder_folderId_fkey";

-- DropForeignKey
ALTER TABLE "_ContactFolders" DROP CONSTRAINT "_ContactFolders_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactFolders" DROP CONSTRAINT "_ContactFolders_B_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_noteId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- DropTable
DROP TABLE "ContactFolder";

-- DropTable
DROP TABLE "_ContactFolders";

-- DropTable
DROP TABLE "contacts";

-- DropTable
DROP TABLE "folders";

-- DropTable
DROP TABLE "notes";

-- DropTable
DROP TABLE "tokens";
